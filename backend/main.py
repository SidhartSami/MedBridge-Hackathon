from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from modules.go_or_stay import check_go_or_stay
from modules.specialist_recommender import recommend_specialist


app = FastAPI(title="MedBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Input(BaseModel):
    text: str


@app.get("/")
def root():
    return {"message": "MedBridge API is running"}




@app.post("/go-or-stay")
async def go_or_stay(data: Input):
    if not data.text:
        raise HTTPException(status_code=400, detail="No input provided")
    return check_go_or_stay(data.text)




@app.post("/specialist")
async def specialist(data: Input):
    if not data.text:
        raise HTTPException(status_code=400, detail="No input provided")
    return recommend_specialist(data.text)


