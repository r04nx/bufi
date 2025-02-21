from pydantic import BaseModel, EmailStr
from typing import Optional

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