from fastapi import FastAPI, HTTPException, Body, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection, get_database
from app.api.endpoints import resume, roadmap, chat, interview
from app.services.resume_service import resume_service
from google import genai
import json
import os
import asyncio
import sys
from pydantic import BaseModel
from typing import List, Optional
import uuid
from bson import ObjectId
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Initialize new Google GenAI Client for global use if needed
try:
    genai_client = genai.Client(api_key=settings.GEMINI_API_KEY)
except Exception as e:
    print(f"CRITICAL ERROR: Failed to initialize Google GenAI Client in main.py: {str(e)}", file=sys.stderr)
    genai_client = None

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure static directory exists
if not os.path.exists("static/uploads"):
    os.makedirs("static/uploads", exist_ok=True)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/api/user/profile")
async def get_user_profile(user_id: str):
    db = get_database()
    profile = await db.users.find_one({"user_id": user_id})
    if not profile:
        return {
            "user_id": user_id,
            "name": "Mohamed Rukshan",
            "email": "m.rukshan@example.com",
            "avatar_url": None
        }
    profile["_id"] = str(profile["_id"])
    return profile

@app.post("/api/user/profile")
async def update_user_profile(
    user_id: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    theme: str = Form("neon-pulse"),
    instant_analysis: bool = Form(True),
    avatar: Optional[UploadFile] = File(None)
):
    db = get_database()
    update_data = {
        "name": name,
        "email": email,
        "theme": theme,
        "instant_analysis": instant_analysis
    }
    
    if avatar:
        contents = await avatar.read()
        avatar_filename = f"uploads/{user_id}_avatar.png"
        with open(f"static/{avatar_filename}", "wb") as f:
            f.write(contents)
        update_data["avatar_url"] = f"http://localhost:8000/static/{avatar_filename}"

    await db.users.update_one(
        {"user_id": user_id},
        {"$set": update_data},
        upsert=True
    )
    return {"message": "Profile updated successfully", "profile": update_data}

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include Routers
app.include_router(resume.router, prefix=f"{settings.API_V1_STR}/resume", tags=["resume"])
app.include_router(roadmap.router, prefix=f"{settings.API_V1_STR}/roadmap", tags=["roadmap"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])
app.include_router(interview.router, prefix=f"{settings.API_V1_STR}/interview", tags=["interview"])

@app.post("/api/generate-roadmap-pdf")
async def api_generate_roadmap_pdf(
    file: UploadFile = File(...),
    target_role: str = Form(...)
):
    try:
        # 1. Extract text
        pdf_content = await file.read()
        resume_text = resume_service.extract_text_from_pdf(pdf_content)
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

        # 2. Generate Roadmap using ResumeService
        roadmap_data = await resume_service.generate_career_roadmap(resume_text, target_role)
        
        # 3. Save to MongoDB
        db = get_database()
        document = {
            "user_id": "demo-user-123", # Static for now
            "target_role": target_role,
            "resume_text": resume_text[:1000], 
            "roadmap": roadmap_data.get("roadmap", []),
            "skill_gap": roadmap_data.get("skill_gap", []),
            "created_at": uuid.uuid4().hex
        }
        await db.roadmaps.insert_one(document)

        return roadmap_data

    except Exception as e:
        print(f"ERROR in api_generate_roadmap_pdf: {str(e)}", file=sys.stderr)
        raise HTTPException(status_code=500, detail=str(e))

class ManualRoadmapRequest(BaseModel):
    user_id: str
    target_role: str
    skills: str

@app.post("/api/generate-roadmap-manual")
async def api_generate_roadmap_manual(request: ManualRoadmapRequest):
    try:
        # Use the exact same engine as PDF parsing but with manual skills text
        roadmap_data = await resume_service.generate_career_roadmap(request.skills, request.target_role)
        
        db = get_database()
        document = {
            "user_id": request.user_id,
            "target_role": request.target_role,
            "resume_text": request.skills[:1000], 
            "roadmap": roadmap_data.get("roadmap", []),
            "skill_gap": roadmap_data.get("skill_gap", []),
            "created_at": uuid.uuid4().hex
        }
        await db.roadmaps.insert_one(document)

        return roadmap_data
    except Exception as e:
        print(f"ERROR in api_generate_roadmap_manual: {str(e)}", file=sys.stderr)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/saved-roadmaps")
async def get_saved_roadmaps(user_id: str):
    db = get_database()
    cursor = db.roadmaps.find({"user_id": user_id})
    roadmaps = await cursor.to_list(length=100)
    for r in roadmaps:
        r["_id"] = str(r["_id"])
    return roadmaps

@app.get("/api/roadmap/{roadmap_id}")
async def get_roadmap(roadmap_id: str):
    db = get_database()
    roadmap = await db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    roadmap["_id"] = str(roadmap["_id"])
    return roadmap

@app.delete("/api/roadmap/{roadmap_id}")
async def delete_roadmap(roadmap_id: str):
    db = get_database()
    result = await db.roadmaps.delete_one({"_id": ObjectId(roadmap_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return {"message": "Roadmap deleted successfully"}

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(user_id: str):
    db = get_database()
    
    # 1. Latest Interview
    latest_interview = await db.interviews.find_one(
        {"user_id": user_id},
        sort=[("_id", -1)]
    )
    
    # 2. Latest Roadmap for Score
    latest_roadmap = await db.roadmaps.find_one(
        {"user_id": user_id},
        sort=[("_id", -1)]
    )
    
    score = 0
    if latest_roadmap:
        # For now we use a high-performance mock score of 92 if analysis exists
        score = 92
        
    return {
        "latest_interview": {
            "target_role": latest_interview["target_role"] if latest_interview else None,
            "completed_at": latest_interview.get("completed_at") if latest_interview else None
        },
        "profile_score": score
    }

@app.get("/")
async def root():
    return {"message": "Welcome to PathAI API"}
