from api.models.graphData import Graph
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/graphData",
    tags=["graphData"],
)

@router.post("", response_model=GraphData)
async def add_graphdata(graphdata: GraphData):
    """Add a graphdata."""
    return await GraphData.add(graphdata)


@router.get("", response_model=list[GraphData])
async def get_graphdata():
    """Get a list of time bucketed graphdata."""
    return await GraphData.get_all()
