from passlib.context import CryptContext
from ..models.user import User
from sqlalchemy.orm import Session
from fastapi import HTTPException
import logging

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
logger = logging.getLogger(__name__)

class AuthService:
    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception as e:
            logger.error(f"Error verifying password: {str(e)}")
            return False

    @staticmethod
    def register_user(db: Session, business_name: str, email: str, password: str) -> User:
        try:
            # Check if user already exists
            existing_user = db.query(User).filter(User.email == email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")
            
            # Create new user
            hashed_password = AuthService.get_password_hash(password)
            user = User(
                business_name=business_name,
                email=email,
                password_hash=hashed_password,
                email_verified=False,
                phone_verified=False,
                two_factor_enabled=False
            )
            
            db.add(user)
            db.commit()
            db.refresh(user)
            return user
            
        except HTTPException as he:
            logger.error(f"HTTP error during registration: {str(he)}")
            raise he
        except Exception as e:
            logger.error(f"Error during registration: {str(e)}")
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail=f"Failed to create user: {str(e)}"
            ) 