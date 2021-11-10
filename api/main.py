from api.app import app
from api.routers import devices, timetables, groups

app.include_router(devices.router)
app.include_router(timetables.router)
app.include_router(groups.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
