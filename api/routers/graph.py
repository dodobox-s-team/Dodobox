from api.models.graph import Graph
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/graph",
    tags=["graph"],
)


@router.post("", response_model=Graph)
async def add_graph(graph: Graph):
    """Add a graph."""
    return await Graph.add(graph)


@router.get("", response_model=list[Graph])
async def get_graphs():
    """Get a list of all graphs."""
    return await Graph.get_all()


@router.get("/{id}", response_model=Graph)
async def get_graph_id(id: int):
    """Get a graph by id."""
    graph = await Graph.get(id)
    if not graph:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No graph with that id was found.")

    return graph


@router.delete("/{id}", response_model=Graph)
async def delete_graph(id: int):
    """Delete an existing graph."""
    graph = await Graph.delete(id)
    if not graph:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No graph with that id was found.")

    return graph


@router.put("/{id}", response_model=Graph)
async def edit_a_graph(id: int, graph: Graph):
    """Updates the information stored about a graph."""
    updated_graph = await Graph.edit(id, graph)
    if not updated_graph:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="graph not found.")

    return updated_graph