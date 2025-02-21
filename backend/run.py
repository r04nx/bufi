import uvicorn
import os
from dotenv import load_dotenv
from app.db import init_db
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def main():
    # Initialize database
    init_db()
    
    # Start server with debug configuration
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=5000,
        reload=True,  # Enable auto-reload
        debug=True,   # Enable debug mode
        workers=1,
        log_level="debug"
    )

if __name__ == "__main__":
    main() 