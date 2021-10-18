from api.app import app
from api.routers import devices

app.include_router(devices.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
