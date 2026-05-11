from google import genai
from app.core.config import settings
import json
import sys
import asyncio
from datetime import datetime
from typing import List, Dict, Any

class InterviewService:
    def __init__(self):
        try:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
            self.model_id = 'gemini-flash-latest'
        except Exception as e:
            print(f"CRITICAL ERROR: Failed to initialize Interview Gemini Client: {str(e)}", file=sys.stderr)
            raise e

    async def get_interview_response(self, target_role: str, history: List[Dict[str, str]]) -> str:
        """
        AI Interviewer chat response using new google-genai SDK.
        """
        system_prompt = (
            f"You are an expert technical interviewer for the role of {target_role}. "
            "Ask exactly one challenging question at a time based on the user's target role. "
            "Wait for the user's response, provide a brief evaluation, and then ask a relevant follow-up question. "
            "Keep the tone professional."
        )
        
        # Construct history for new SDK
        # The new SDK expects contents as a list of Content objects or dicts
        contents = []
        
        # Add system prompt as an instruction if supported, or as a first user turn
        contents.append({"role": "user", "parts": [{"text": system_prompt}]})
        
        # If history exists, process it while ensuring alternation
        if history:
            last_msg_obj = history[-1]
            if last_msg_obj['role'] == 'user':
                last_user_msg = last_msg_obj['content']
                history_to_process = history[:-1]
            else:
                last_user_msg = "Please proceed with the next interview question."
                history_to_process = history

            for msg in history_to_process:
                role = "user" if msg['role'] == "user" else "model"
                # Merge consecutive roles if any (safety check)
                if contents and contents[-1]['role'] == role:
                    contents[-1]['parts'].append({"text": msg['content']})
                else:
                    contents.append({"role": role, "parts": [{"text": msg['content']}]})
        else:
            last_user_msg = "Hello, I am ready for my interview."

        # Ensure history ends with a model turn for turn-taking compliance
        if contents and contents[-1]['role'] == 'user':
            contents.append({"role": "model", "parts": [{"text": "Understood. Please begin."}]})

        try:
            # Start chat with history
            chat = self.client.chats.create(
                model=self.model_id,
                history=contents
            )
            
            # Retry logic
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    response = chat.send_message(last_user_msg)
                    return response.text
                except Exception as retry_err:
                    print(f"DEBUG: AI Retry attempt {attempt+1} failed: {str(retry_err)}", file=sys.stderr)
                    if attempt == max_retries - 1:
                        raise retry_err
                    await asyncio.sleep(2 ** attempt)
                    
        except Exception as e:
            # EXACT ERROR PRINTING AS REQUESTED
            print(f"--- INTERVIEW SERVICE ERROR ---", file=sys.stderr)
            print(f"Error Type: {type(e).__name__}", file=sys.stderr)
            print(f"Error Message: {str(e)}", file=sys.stderr)
            import traceback
            traceback.print_exc()
            print(f"-------------------------------", file=sys.stderr)
            raise Exception(f"Interview AI failed: {str(e)}")

    async def save_interview_session(self, user_id: str, target_role: str, transcript: List[Dict[str, str]]):
        """
        Saves the final interview transcript and evaluation to MongoDB Atlas.
        """
        db = get_database()
        from app.core.database import get_database
        
        evaluation_prompt = f"Summarize this interview transcript and provide a brief evaluation of the candidate for the {target_role} role:\n\n"
        for msg in transcript:
            evaluation_prompt += f"{msg['role'].upper()}: {msg['content']}\n"
        
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=evaluation_prompt
            )
            evaluation = response.text
        except Exception as e:
            print(f"DEBUG: Evaluation generation failed: {str(e)}", file=sys.stderr)
            evaluation = "Evaluation could not be generated."

        session_data = {
            "user_id": user_id,
            "target_role": target_role,
            "transcript": transcript,
            "evaluation": evaluation,
            "completed_at": datetime.utcnow()
        }
        
        await db.interviews.insert_one(session_data)
        return session_data

interview_service = InterviewService()
