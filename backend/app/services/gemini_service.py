import google.generativeai as genai
from app.core.config import settings
import json
from typing import Dict, Any

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)

    async def analyze_resume(self, resume_text: str) -> Dict[str, Any]:
        """
        Analyzes resume text and returns a structured JSON summary.
        """
        prompt = f"""
        You are a Senior AI Career Architect. Analyze the following resume text and extract the information into a structured JSON format.
        
        JSON Structure:
        {{
            "full_name": "string",
            "professional_summary": "string",
            "skills": {{
                "Programming Languages": ["list", "of", "strings"],
                "Frameworks": ["list"],
                "Tools": ["list"],
                "Soft Skills": ["list"]
            }},
            "education": [
                {{
                    "degree": "string",
                    "university": "string",
                    "year": "string"
                }}
            ],
            "projects": [
                {{
                    "name": "string",
                    "description": "string",
                    "technologies": ["list", "of", "technologies", "used"]
                }}
            ],
            "experience": [
                {{
                    "job_title": "string",
                    "company": "string",
                    "duration": "string",
                    "responsibilities": ["list"]
                }}
            ]
        }}

        Resume Text:
        {resume_text}

        Return ONLY a valid JSON object.
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Find JSON block in response
            text = response.text
            if "```json" in text:
                text = text.split("```json")[-1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[-1].split("```")[0].strip()
            
            return json.loads(text)
        except Exception as e:
            raise Exception(f"AI Analysis failed: {str(e)}")

    async def compare_skills_and_generate_roadmap(self, current_skills: list, target_role: str) -> Dict[str, Any]:
        """
        Compares current skills with target role requirements and generates a roadmap.
        """
        prompt = f"""
        Target Role: {target_role}
        Current Skills: {', '.join(current_skills)}

        Act as a Senior AI Mentor. 
        1. Perform a Gap Analysis (list missing key skills).
        2. Generate a 4-week step-by-step learning roadmap.

        JSON Format:
        {{
            "skill_gap": ["skill1", "skill2"],
            "roadmap": [
                {{
                    "week": 1,
                    "goal": "Base understanding",
                    "topics": ["topic1", "topic2"],
                    "resources": [{{"title": "Docs", "url": "https://..."}}],
                    "task": "Build X"
                }}
            ]
        }}

        Return ONLY valid JSON.
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text
            if "```json" in text:
                text = text.split("```json")[-1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[-1].split("```")[0].strip()
            
            return json.loads(text)
        except Exception as e:
            raise Exception(f"Roadmap generation failed: {str(e)}")

    async def get_mentor_response(self, resume_data: str, user_message: str, history: list) -> str:
        """
        AI Mentor Chat response.
        """
        chat_history = []
        for msg in history:
            chat_history.append({"role": "user" if msg.role == "user" else "model", "parts": [msg.content]})

        chat = self.model.start_chat(history=chat_history)
        
        system_instruction = f"""
        You are a Senior AI Career Mentor at PathAI. 
        A student is asking for career advice based on their resume.
        Resume Context: {resume_data}
        
        Your tone should be: Professional, Encouraging, and Insightful.
        Always provide actionable advice.
        """
        
        full_message = f"{system_instruction}\n\nUser: {user_message}"
        
        try:
            response = chat.send_message(full_message)
            return response.text
        except Exception as e:
            raise Exception(f"Chat failed: {str(e)}")

gemini_service = GeminiService()
