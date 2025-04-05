from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import logging
from gemini_handler import get_gemini_response  # ✅ External Gemini handler

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (for frontend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- 🔹 ASK AI --------------------

class AskRequest(BaseModel):
    query: str

@app.post("/ask-ai")
async def ask_ai(req: AskRequest):
    try:
        logging.info(f"User query: {req.query}")
        answer = await get_gemini_response(req.query)
        logging.info(f"AI response: {answer}")
        return {"answer": answer}
    except Exception as e:
        logging.error(f"Exception: {e}")
        return {"answer": f"Error: {str(e)}"}

# -------------------- 🔹 INVENTORY --------------------

class InventoryItem(BaseModel):
    name: str
    quantity: int

inventory_db = [
    {"name": "Water Bottles", "quantity": 150},
    {"name": "First Aid Kits", "quantity": 40},
]

@app.get("/inventory", response_model=List[InventoryItem])
async def get_inventory():
    return inventory_db

@app.post("/inventory")
async def add_inventory(item: InventoryItem):
    inventory_db.append(item.dict())
    return {"message": "Item added successfully"}

# -------------------- 🔹 VOLUNTEER --------------------

class Volunteer(BaseModel):
    name: str
    contact: str

volunteers_db = []

@app.post("/volunteer")
async def register_volunteer(vol: Volunteer):
    volunteers_db.append(vol.dict())
    return {"message": "Volunteer registered successfully"}
