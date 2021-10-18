from api.schemas import Device
from fastapi import APIRouter, HTTPException, status

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
)


@router.post("", response_model=Device)
async def add_device(device: Device):
    """Add a device."""
    return await Device.add(device)


@router.get("", response_model=list[Device])
async def get_devices():
    """Get a list of all devices."""
    return await Device.get_all()


@router.get("/{id}", response_model=Device)
async def get_device_id(id: int):
    """Get a device by id."""
    device = await Device.get(id)
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No device with that id was found.")

    return device


@router.delete("/{id}", response_model=Device)
async def delete_device(id: int):
    """Delete an existing device."""
    device = await Device.delete(id)
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No device with that id was found.")

    return device


@router.put("/{id}", response_model=Device)
async def edit_a_device(id: int, device: Device):
    """Updates the information stored about a device."""
    updated_device = await Device.edit(id, device)
    if not updated_device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="device not found.")

    return updated_device
