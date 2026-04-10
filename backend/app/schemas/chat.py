from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str # 'user' or 'assistant'
    content: str

class ChatRequest(BaseModel):
    resume_id: str
    message: str
    history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    response: str
