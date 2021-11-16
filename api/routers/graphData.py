from api.models.graphData import GraphData
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


@router.delete("/{id}", response_model=GraphData)
async def delete_graphData(id: int):
    """Delete a data from Graph"""
    graphdata = await GraphData.delete(id)
    if not graphdata:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No data with that ID was found.")

    return graphdata



@router.put("/{id}", response_model=GraphData)
async def edit_a_graphdata(id: int, graphData: GraphData):
    """Updates informations about data."""
    updated_graphData = await GraphData.edit(id, graphData)
    if not updated_graphData:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No data with that ID was found.")

    return updated_graphData
