import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sports App Simulation API")

# Configure CORS to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Sports Streaming Data
STREAMS = [
    {"id": 1, "title": "Live Championship Game", "category": "Football", "is_premium": False},
    {"id": 2, "title": "Pro Basketball Finals", "category": "Basketball", "is_premium": True},
    {"id": 3, "title": "Grand Slam Highlights", "category": "Tennis", "is_premium": True},
]

@app.get("/")
def read_root():
    return {"message": "Sports Streaming API is online!"}

@app.get("/api/streams")
def get_streams():
    return STREAMS