from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.user import User
from ..utils.auth import get_current_user
from pydantic import BaseModel
from datetime import datetime
import logging

router = APIRouter(prefix="/api/onboarding", tags=["onboarding"])
logger = logging.getLogger(__name__)

class OnboardingData(BaseModel):
    business_name: str
    phone: str
    industry_sector: str
    business_size: str

@router.post("/complete")
async def complete_onboarding(
    data: OnboardingData,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        user = db.query(User).filter(User.id == current_user.id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Update user information
        user.business_name = data.business_name
        user.phone = data.phone
        user.industry_sector = data.industry_sector
        user.business_size = data.business_size
        user.onboarding_completed_at = datetime.utcnow()

        db.commit()
        
        return {
            "message": "Onboarding completed successfully",
            "completed": True
        }
    except Exception as e:
        logger.error(f"Error completing onboarding: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to complete onboarding: {str(e)}"
        ) 