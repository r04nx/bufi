from sqlalchemy import Column, String, DateTime, func, Float, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from ..db import Base

class Deal(Base):
    __tablename__ = "deals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    target_company = Column(String, nullable=False)
    status = Column(String, nullable=False) # e.g., "Sourcing", "Due Diligence", "Negotiation", "Closed"
    value = Column(Float, nullable=True)
    description = Column(String, nullable=True)
    sector = Column(String, nullable=True)
    deal_type = Column(String, nullable=False) # e.g., "M&A", "LBO", "IPO"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user = relationship("User", back_populates="deals")
    valuations = relationship("Valuation", back_populates="deal")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Valuation(Base):
    __tablename__ = "valuations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    deal_id = Column(UUID(as_uuid=True), ForeignKey("deals.id"))
    deal = relationship("Deal", back_populates="valuations")

    method = Column(String, nullable=False) # "DCF", "Comps", "LBO"
    data = Column(JSON, nullable=False) # Stores modeling inputs and results

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class MarketData(Base):
    __tablename__ = "market_data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symbol = Column(String, nullable=False, index=True)
    asset_class = Column(String, nullable=False) # "Equity", "FX", "Fixed Income", etc.
    price = Column(Float, nullable=False)
    change_percent = Column(Float, nullable=True)
    volume = Column(Float, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class TradingSignal(Base):
    __tablename__ = "trading_signals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symbol = Column(String, nullable=False, index=True)
    signal_type = Column(String, nullable=False) # "Buy", "Sell", "Neutral"
    confidence = Column(Float, nullable=True)
    reasoning = Column(String, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
