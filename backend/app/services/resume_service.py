from google import genai
from app.core.config import settings
import json
import sys
import asyncio
from typing import Dict, Any, List
import fitz  # PyMuPDF

class ResumeService:
    def __init__(self):
        try:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
            self.model_id = 'gemini-flash-latest'
        except Exception as e:
            print(f"CRITICAL ERROR: Failed to initialize Resume Gemini Client: {str(e)}", file=sys.stderr)
            raise e

    def extract_text_from_pdf(self, pdf_content: bytes) -> str:
        """
        Extracts text from PDF using PyMuPDF.
        """
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            return text
        except Exception as e:
            print(f"Error extracting text from PDF: {str(e)}", file=sys.stderr)
            raise Exception("Failed to parse PDF resume.")

    async def generate_career_roadmap(self, resume_text: str, target_role: str) -> Dict[str, Any]:
        """
        Generates a 12-week career roadmap based on resume and target role.
        """
        prompt = f"""
        Act as a Senior AI Career Architect. Analyze the provided resume text and the target role.
        1. Identify the skill gaps between the candidate's current profile and the target role: "{target_role}".
        2. Generate a detailed 12-week learning roadmap to bridge these gaps.
        
        Resume Text:
        {resume_text}

        You MUST return ONLY a valid JSON object with the following structure:
        {{
            "skill_gap": ["skill1", "skill2", ...],
            "roadmap": [
                {{
                    "week": 1,
                    "goal": "Weekly focus goal",
                    "topics": ["Topic 1", "Topic 2", ...],
                    "resources": [
                        {{"title": "Resource Title", "url": "Resource URL"}}
                    ],
                    "task": "A practical hands-on task for the week"
                }},
                ... (up to week 12)
            ]
        }}
        
        Ensure "roadmap" is an ARRAY of 12 objects.
        Return ONLY the raw JSON. No markdown formatting, no preamble.
        """

        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = await asyncio.to_thread(
                    self.client.models.generate_content,
                    model=self.model_id,
                    contents=prompt
                )
                text = response.text.strip()
                
                # Clean JSON
                if "```json" in text:
                    text = text.split("```json")[-1].split("```")[0].strip()
                elif "```" in text:
                    text = text.split("```")[-1].split("```")[0].strip()
                
                # Validate JSON structure
                data = json.loads(text)
                if "roadmap" in data and isinstance(data["roadmap"], list):
                    return data
                else:
                    raise ValueError("AI response missing 'roadmap' array.")
                    
            except Exception as e:
                print(f"--- RESUME SERVICE ERROR (Attempt {attempt+1}) ---", file=sys.stderr)
                print(f"Error: {str(e)}", file=sys.stderr)
                if attempt == max_retries - 1:
                    raise Exception(f"Failed to generate valid roadmap after {max_retries} attempts.")
                await asyncio.sleep(2 ** attempt)

resume_service = ResumeService()
