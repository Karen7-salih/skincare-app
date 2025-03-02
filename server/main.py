from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.skincare_routes import router as skincare_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://localhost:3004",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3004",
    "*"  # Allow all origins (Optional)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ✅ Using the full list instead of just one
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods
    allow_headers=["*"]   # ✅ Allow all headers
)  # ✅ Closing the function properly

@app.get("/")
async def home():
    return {"message": "Welcome to the Skincare API!"}

app.include_router(skincare_router, prefix="/skincare")
