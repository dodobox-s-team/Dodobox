from api.models.timetables import Timetable
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/timetables",
    tags=["timetables"],
)


@router.post("", response_model=Timetable)
async def add_timetable(timetable: Timetable):
    """Add a timetable."""
    return await Timetable.add(timetable)


@router.get("", response_model=list[Timetable])
async def get_timetables():
    """Get a list of all timetables."""
    return await Timetable.get_all()


@router.get("/{id}", response_model=Timetable)
async def get_timetable_id(id: int):
    """Get a timetable by id."""
    timetable = await Timetable.get(id)
    if not timetable:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No timetable with that id was found.")

    return timetable


@router.delete("/{id}", response_model=Timetable)
async def delete_timetable(id: int):
    """Delete an existing timetable."""
    timetable = await Timetable.delete(id)
    if not timetable:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No timetable with that id was found.")

    return timetable


@router.put("/{id}", response_model=Timetable)
async def edit_a_timetable(id: int, timetable: Timetable):
    """Updates the information stored about a timetable."""
    edit_timetable = await Timetable.edit(id, timetable)
    if not edit_timetable:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No timetable with that id was found.")

    return edit_timetable

