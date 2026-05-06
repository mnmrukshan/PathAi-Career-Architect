from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "PathAI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Gemini API
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-pro")

    # MongoDB
    MONGODB_URL: str = os.getenv("MONGODB_URL", os.getenv("MONGO_URI", ""))
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "pathai_db")

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "yoursupersecretkeyhereatleast32chars")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
