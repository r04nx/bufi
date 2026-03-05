import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from ..models.institutional import MarketData, TradingSignal

SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "JPM", "GS", "MS"]
ASSET_CLASSES = ["Equity", "Equity", "Equity", "Equity", "Equity", "Finance", "Finance", "Finance"]

def seed_market_data(db: Session):
    for i, symbol in enumerate(SYMBOLS):
        price = random.uniform(100, 3000)
        change = random.uniform(-5, 5)
        volume = random.uniform(1000000, 50000000)

        md = MarketData(
            symbol=symbol,
            asset_class=ASSET_CLASSES[i],
            price=price,
            change_percent=change,
            volume=volume
        )
        db.add(md)

    db.commit()

def generate_signals(db: Session):
    for symbol in SYMBOLS:
        signal_type = random.choice(["Buy", "Sell", "Neutral"])
        confidence = random.uniform(0.6, 0.95)
        reasoning = f"AI Analysis based on recent momentum and {random.choice(['RSI', 'MACD', 'Earnings Preview'])} indicators."

        ts = TradingSignal(
            symbol=symbol,
            signal_type=signal_type,
            confidence=confidence,
            reasoning=reasoning
        )
        db.add(ts)

    db.commit()
