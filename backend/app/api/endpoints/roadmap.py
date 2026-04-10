from fastapi import APIRouter, HTTPException, Depends
from app.services.gemini_service import gemini_service
from app.core.database import get_database
from app.schemas.roadmap import RoadmapRequest, RoadmapResponse
import json

router = APIRouter()

@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap(request: RoadmapRequest):
    db = get_database()
    
    # 1. Fetch resume data
    resume = await db.resumes.find_one({"id": request.resume_id})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Extract skills
    skills_dict = resume["data"].get("skills", {})
    current_skills = []
    for category, skills in skills_dict.items():
        if isinstance(skills, list):
            current_skills.extend(skills)
    
    try:
        # 2. Generate Roadmap using Gemini
        roadmap_data = await gemini_service.compare_skills_and_generate_roadmap(
            current_skills, 
            request.target_role
        )
        
        # 3. Store in MongoDB
        result = {
            "resume_id": request.resume_id,
            "target_role": request.target_role,
            "skill_gap": roadmap_data.get("skill_gap", []),
            "roadmap": roadmap_data.get("roadmap", [])
        }
        
        await db.roadmaps.update_one(
            {"resume_id": request.resume_id, "target_role": request.target_role},
            {"$set": result},
            upsert=True
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{resume_id}")
async def get_roadmaps(resume_id: str):
    db = get_database()
    roadmaps = await db.roadmaps.find({"resume_id": resume_id}).to_list(10)
    return roadmaps
