from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app_frontend = FastAPI()

@app_frontend.get("/", response_class=HTMLResponse)
def home():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()