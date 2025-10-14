from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from datetime import date

app = FastAPI()

# allow your React frontend to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# example route
@app.get("/")
def root():
    return {"message": "FastAPI backend running!"}

@app.get('/get_country_ratios', methods = ['GET'])
def root():
    pass