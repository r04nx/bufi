from fastapi import APIRouter, Depends, HTTPException, status, Request, Body
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.user import User
from ..schemas.auth import LoginRequest, TokenResponse
from ..utils.auth import verify_password, create_access_token
from datetime import datetime

router = APIRouter(prefix="/api/auth", tags=["auth"])

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
        token = create_access_token(
            data={"sub": str(user.id), "email": user.email}
        )
        
        return TokenResponse(token=token)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        ) 