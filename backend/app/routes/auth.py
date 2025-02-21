from fastapi import APIRouter, Depends, HTTPException, status, Request, Body
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.user import User
from ..schemas.auth import LoginRequest, TokenResponse, UserRegister
from ..utils.auth import verify_password, create_access_token, get_current_user
from datetime import datetime, timedelta
from ..services.auth import AuthService
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from typing import Optional
import os
import logging

router = APIRouter(prefix="/api/auth", tags=["auth"])
logger = logging.getLogger(__name__)

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    token: str
    token_type: str

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest = Body(...), db: Session = Depends(get_db)):
    try:
        # Find user by email
        user = db.query(User).filter(User.email == credentials.email).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        if not verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Update last login
        user.last_login_at = datetime.utcnow()
        db.commit()
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )
        
        return TokenResponse(token=token)
        
    except HTTPException as he:
        logger.error(f"Login error: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    try:
        # Register the user
        user = AuthService.register_user(
            db=db,
            business_name=user_data.business_name,
            email=user_data.email,
            password=user_data.password
        )
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )
        
        return TokenResponse(token=token)
        
    except HTTPException as he:
        logger.error(f"HTTP error in register endpoint: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error in register endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/onboarding-status")
async def check_onboarding_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Get fresh user data
        user = db.query(User).filter(User.id == current_user.id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Check if onboarding is already completed
        if user.onboarding_completed_at:
            return {
                "completed": True,
                "missing_fields": {}
            }
        
        # Check required onboarding fields
        missing_fields = {
            "business_name": not user.business_name,
            "email_verified": not user.email_verified,
            "phone": not user.phone
        }
        
        onboarding_completed = not any(missing_fields.values())
        
        # If all fields are complete, update onboarding_completed_at
        if onboarding_completed and not user.onboarding_completed_at:
            user.onboarding_completed_at = datetime.utcnow()
            db.commit()
        
        return {
            "completed": onboarding_completed,
            "missing_fields": missing_fields
        }
        
    except Exception as e:
        logger.error(f"Error checking onboarding status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to check onboarding status: {str(e)}"
        ) 