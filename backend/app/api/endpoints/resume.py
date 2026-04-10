from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services.pdf_service import pdf_service
from app.services.gemini_service import gemini_service
from app.core.database import get_database
from app.schemas.resume import ResumeAnalysisResponse, ResumeData
import uuid

router = APIRouter()

@router.post("/upload", response_model=ResumeAnalysisResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        # 1. Extract text from PDF
        content = await file.read()
        resume_text = pdf_service.extract_text_from_pdf(content)
        
        # 2. Analyze with Gemini
        analysis_data = await gemini_service.analyze_resume(resume_text)
        
        # 3. Store in MongoDB
        db = get_database()
        analysis_id = str(uuid.uuid4())
        record = {
            "id": analysis_id,
            "data": analysis_data,
            "raw_text": resume_text
        }
        await db.resumes.insert_one(record)
        
        return {
            "id": analysis_id,
            "data": analysis_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{resume_id}", response_model=ResumeAnalysisResponse)
async def get_resume(resume_id: str):
    db = get_database()
    resume = await db.resumes.find_one({"id": resume_id})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {
        "id": resume["id"],
        "data": resume["data"]
    }
