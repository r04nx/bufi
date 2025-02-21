from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from . import db
from .routes import auth
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Bufi API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)

@app.get("/api/health")
async def health_check(db: Session = Depends(db.get_db)):
    try:
        # Test database connection
        db.execute(text("SELECT 1"))
        db.commit()
        return {
            "status": "healthy",
            "database": "connected",
            "message": "API server is running and database is connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "message": str(e)
        } 