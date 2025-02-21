from pydantic import BaseModel, EmailStr
from typing import Optional, Dict

class UserRegister(BaseModel):
    business_name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "user@example.com",
                "password": "strongpassword123"
            }
        }
    }

class TokenResponse(BaseModel):
    token: str
    token_type: str = "bearer"

class OnboardingStatus(BaseModel):
    completed: bool
    missing_fields: Dict[str, bool]

    model_config = {
        "json_schema_extra": {
            "example": {
                "completed": False,
                "missing_fields": {
                    "business_name": False,
                    "email_verified": True,
                    "phone": True
                }
            }
        }
    } 