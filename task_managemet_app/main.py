from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.utils.db import Base, engine
from src.tasks.router import task_routes
from src.user.router import user_routes

app = FastAPI(strict_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False, 
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(engine)

app.include_router(user_routes)
app.include_router(task_routes)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running fine!"}