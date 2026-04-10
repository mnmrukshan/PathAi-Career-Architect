from pydantic import BaseModel
from typing import List, Dict, Any

class RoadmapStep(BaseModel):
    week: int
    goal: str
    topics: List[str]
    resources: List[Dict[str, str]]
    task: str

class RoadmapRequest(BaseModel):
    resume_id: str
    target_role: str

class RoadmapResponse(BaseModel):
    resume_id: str
    target_role: str
    skill_gap: List[str]
    roadmap: List[RoadmapStep]
