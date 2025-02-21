from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL")

# Create SQLAlchemy engine
engine = create_engine(POSTGRES_URL)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    try:
        # Try to create a connection and execute a simple query
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            connection.commit()
        print("Database connection successful!")
    except Exception as e:
        print(f"Database connection failed: {str(e)}")
        raise e 