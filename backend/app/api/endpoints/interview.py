from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from app.services.interview_service import interview_service

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class InterviewChatRequest(BaseModel):
    target_role: str
    history: List[ChatMessage]

class InterviewEndRequest(BaseModel):
    user_id: str
    target_role: str
    transcript: List[ChatMessage]

@router.post("/chat")
async def interview_chat(request: InterviewChatRequest):
    try:
        # Convert Pydantic models to dicts for the service
        history_dicts = [{"role": m.role, "content": m.content} for m in request.history]
        response_text = await interview_service.get_interview_response(
            request.target_role, 
            history_dicts
        )
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/end")
async def end_interview(request: InterviewEndRequest):
    try:
        transcript_dicts = [{"role": m.role, "content": m.content} for m in request.transcript]
        session = await interview_service.save_interview_session(
            request.user_id,
            request.target_role,
            transcript_dicts
        )
        # Convert ObjectId or other non-serializable fields if necessary
        if "_id" in session:
            session["_id"] = str(session["_id"])
        return session
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
