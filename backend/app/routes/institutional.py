from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db import get_db
from ..models.institutional import Deal, Valuation, MarketData, TradingSignal
from ..schemas.institutional import DealCreate, DealResponse, ValuationCreate, ValuationResponse, MarketDataResponse, TradingSignalResponse
from .auth import get_current_user
from ..models.user import User

router = APIRouter(prefix="/api/institutional", tags=["institutional"])

@router.post("/deals", response_model=DealResponse)
def create_deal(deal: DealCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_deal = Deal(**deal.model_dump(), user_id=current_user.id)
    db.add(db_deal)
    db.commit()
    db.refresh(db_deal)
    return db_deal

@router.get("/deals", response_model=List[DealResponse])
def get_deals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Deal).filter(Deal.user_id == current_user.id).all()

@router.get("/market-data", response_model=List[MarketDataResponse])
def get_market_data(db: Session = Depends(get_db)):
    # In a real app, this might trigger a fetch from an external API or return cached data
    return db.query(MarketData).all()

@router.get("/signals", response_model=List[TradingSignalResponse])
def get_signals(db: Session = Depends(get_db)):
    return db.query(TradingSignal).all()
