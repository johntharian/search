from fastapi import FastAPI, Header

from pydantic import BaseModel
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


from utils import index_images,get_matches

logging.basicConfig(level=logging.INFO)
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Code(BaseModel):
    access_token: str
    refresh_token: str
    scope: str
    token_type: str
    id_token: str
    expiry_date: int

@app.post("/api/data")
def download_data(code: Code ):
    print(code.access_token)
    # Implement logic to download data using the access_token
    # You can use access_token.access_token to access the token value

    # For demonstration purposes, let's return a sample response
    message = index_images(code)
    return {"message": message}


@app.get("/api/{query}")
def search_images(query:str,) :
    res = get_matches(query)
    print("here")
    return  res

if __name__ == "__main__":
    import uvicorn

    # Start the FastAPI app with Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=4000)