from pydantic import BaseModel
from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime

class DealBase(BaseModel):
    title: str
    target_company: str
    status: str
    value: Optional[float] = None
    description: Optional[str] = None
    sector: Optional[str] = None
    deal_type: str

class DealCreate(DealBase):
    pass

class DealResponse(DealBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class ValuationBase(BaseModel):
    deal_id: UUID
    method: str
    data: Any

class ValuationCreate(ValuationBase):
    pass

class ValuationResponse(ValuationBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class MarketDataResponse(BaseModel):
    symbol: str
    asset_class: str
    price: float
    change_percent: Optional[float]
    volume: Optional[float]
    timestamp: datetime

    class Config:
        from_attributes = True

class TradingSignalResponse(BaseModel):
    symbol: str
    signal_type: str
    confidence: Optional[float]
    reasoning: Optional[str]
    timestamp: datetime

    class Config:
        from_attributes = True
