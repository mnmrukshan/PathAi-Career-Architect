from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Project(BaseModel):
    name: str
    description: str
    technologies: List[str]

class Education(BaseModel):
    degree: str
    university: str
    year: str

class Experience(BaseModel):
    job_title: str
    company: str
    duration: str
    responsibilities: List[str]

class ResumeData(BaseModel):
    full_name: str
    professional_summary: str
    skills: Dict[str, List[str]]
    education: List[Education]
    projects: List[Project]
    experience: List[Experience]

class ResumeAnalysisResponse(BaseModel):
    id: str
    data: ResumeData
