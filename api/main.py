from api.app import app
from api.routers import devices, timetables, groups, graph, graphData

app.include_router(devices.router)
app.include_router(timetables.router)
app.include_router(groups.router)
app.include_router(graph.router)
app.include_router(graphData.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
