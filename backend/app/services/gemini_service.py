from google import genai
from app.core.config import settings
import json
import sys
from typing import Dict, Any

class GeminiService:
    def __init__(self):
        try:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
            self.model_id = 'gemini-flash-latest'
        except Exception as e:
            print(f"CRITICAL ERROR: Failed to initialize Gemini Client: {str(e)}", file=sys.stderr)
            raise e

    async def analyze_resume(self, resume_text: str) -> Dict[str, Any]:
        prompt = f"""
        You are a Senior AI Career Architect. Analyze the following resume text and extract the information into a structured JSON format.
        
        Resume Text:
        {resume_text}

        Return ONLY a valid JSON object.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt
            )
            text = response.text
            
            # Clean JSON
            if "```json" in text:
                text = text.split("```json")[-1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[-1].split("```")[0].strip()
            
            return json.loads(text)
        except Exception as e:
            print(f"DEBUG: Resume analysis failed: {str(e)}", file=sys.stderr)
            raise Exception(f"AI Analysis failed: {str(e)}")

    async def compare_skills_and_generate_roadmap(self, current_skills: list, target_role: str) -> Dict[str, Any]:
        prompt = f"""
        Target Role: {target_role}
        Current Skills: {', '.join(current_skills)}

        Act as a Senior AI Mentor. 
        1. Perform a Gap Analysis (list missing key skills).
        2. Generate a 4-week step-by-step learning roadmap.

        Return ONLY valid JSON.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt
            )
            text = response.text
            
            if "```json" in text:
                text = text.split("```json")[-1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[-1].split("```")[0].strip()
            
            return json.loads(text)
        except Exception as e:
            print(f"DEBUG: Roadmap generation failed: {str(e)}", file=sys.stderr)
            raise Exception(f"Roadmap generation failed: {str(e)}")

    async def get_mentor_response(self, resume_data: str, user_message: str, history: list) -> str:
        # History conversion for new SDK
        contents = []
        for msg in history:
            role = "user" if msg.role == "user" else "model"
            contents.append({"role": role, "parts": [{"text": msg.content}]})

        system_instruction = f"""
        You are a Senior AI Career Mentor at PathAI. 
        Resume Context: {resume_data}
        Tone: Professional, Encouraging, and Insightful.
        """
        
        full_message = f"{system_instruction}\n\nUser: {user_message}"
        
        try:
            # New SDK chat implementation
            chat = self.client.chats.create(
                model=self.model_id,
                history=contents
            )
            response = chat.send_message(full_message)
            return response.text
        except Exception as e:
            print(f"DEBUG: Chat failed: {str(e)}", file=sys.stderr)
            raise Exception(f"Chat failed: {str(e)}")

    async def optimize_resume(self, resume_text: str, target_role: str) -> Dict[str, Any]:
        prompt = f"""
        Act as a Senior AI Resume Architect. Extract experiences and optimize them for "{target_role}".
        {resume_text}
        Return ONLY valid JSON.
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt
            )
            text = response.text
            
            if "```json" in text:
                text = text.split("```json")[-1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[-1].split("```")[0].strip()
            
            return json.loads(text)
        except Exception as e:
            print(f"DEBUG: Resume optimization failed: {str(e)}", file=sys.stderr)
            raise Exception(f"Resume optimization failed: {str(e)}")

gemini_service = GeminiService()
