from api.models.devices import Device
from api.models.groups import Group
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/groups",
    tags=["groups"],
)


@router.post("", response_model=Group)
async def add_group(group: Group):
    """Add a group."""
    return await Group.add(group)


@router.get("", response_model=list[Group])
async def get_groups():
    """Get a list of all groups."""
    return await Group.get_all()


@router.get("/{id}", response_model=Group)
async def get_group_id(id: int):
    """Get a group by id."""
    group = await Group.get(id)
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No group with that id was found.")

    return group


@router.delete("/{id}", response_model=Group)
async def delete_group(id: int):
    """Delete an existing group."""
    group = await Group.delete(id)
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No group with that id was found.")

    return group


@router.put("/{id}", response_model=Group)
async def edit_a_group(id: int, group: Group):
    """Updates the information stored about a group."""
    updated_group = await Group.edit(id, group)
    if not updated_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="group not found.")

    return updated_group


@router.get("/{id}/devices", response_model=list[Device])
async def get_group_devices(id: int):
    """Add a device to a group."""
    return await Group.get_devices(id)
