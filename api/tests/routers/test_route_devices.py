import pytest
from api.models.devices import Device
from fastapi import status
from fastapi.testclient import TestClient

pytestmark = pytest.mark.asyncio


@pytest.fixture
def device2(device):
    return Device(id=1, name="Lampe", modele="esp32", type=0, ip="192.168.1.10", toggle=True)


class TestRouteDevices:
    async def test_add_device(self, client: TestClient, device2: Device):
        # Add a device
        response = await client.post("/devices", json=device2.dict())
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == device2

        # Check if the device we added has been added.
        # We run the tests against a fresh database every time, so it should contain only our device.
        response = await client.get(f"/devices/{device2.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == device2

    async def test_get_device(self, client: TestClient, device: Device):
        # Also check that the path to the individual resource works
        response = await client.get(f"/devices/{device.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == device

        # Get a nonexistant resource should return 404
        response = await client.get("/devices/404")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    async def test_edit_device(self, client: TestClient, device: Device):
        device.name = new_name = "Ampoule"

        # Update a device that doesn't exist. It should return a 404 error.
        response = await client.put("/devices/666", json=device.dict())
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Update the device's name.
        response = await client.put(f"/devices/{device.id}", json=device.dict())
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == device

        # Check the name has changed
        response = await client.get(f"/devices/{device.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json().get("name") == new_name

    async def test_delete_device(self, client: TestClient, device: Device):
        # Check for a device that doesn't exists
        response = await client.delete("/devices/666")
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Delete the device.
        response = await client.delete(f"/devices/{device.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == device

        # Check that the device does not exists anymore.
        #response = await client.get("/devices")
        #assert response.status_code == status.HTTP_200_OK
        #assert response.json() == []

