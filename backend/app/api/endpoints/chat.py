from fastapi import APIRouter, HTTPException
from app.services.gemini_service import gemini_service
from app.core.database import get_database
from app.schemas.chat import ChatRequest, ChatResponse
import json

router = APIRouter()

@router.post("/mentor", response_model=ChatResponse)
async def mentor_chat(request: ChatRequest):
    db = get_database()
    
    # 1. Fetch resume context
    resume = await db.resumes.find_one({"id": request.resume_id})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume context not found")
    
    resume_context = json.dumps(resume["data"], indent=2)
    
    try:
        # 2. Get AI Response
        response_text = await gemini_service.get_mentor_response(
            resume_context,
            request.message,
            request.history
        )
        
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
