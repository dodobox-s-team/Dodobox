import pytest
from api.models.devices import Device
from api.models.groups import Group
from fastapi import status
from fastapi.testclient import TestClient

pytestmark = pytest.mark.asyncio


@pytest.fixture
def group2(group):
    return Group(id=1, name="Cuisine")


class TestRouteGroup:
    async def test_add_group(self, client: TestClient, group2: Group):
        # Add a group
        response = await client.post("/groups", json=group2.dict())
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group2

        # Check if the group we added has been added.
        # We run the tests against a fresh database every time, so it should contain only our group.
        response = await client.get(f"/groups/{group2.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group2

    async def test_add_unique_group(self, client: TestClient, group: Group):
        # Make that two groups cannot have the same name
        response = await client.post("/groups", json=group.dict())
        assert response.status_code == status.HTTP_409_CONFLICT

    async def test_get_group(self, client: TestClient, group: Group):
        # Also check that the path to the individual resource works
        response = await client.get(f"/groups/{group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group

        # Get a nonexistant resource should return 404
        response = await client.get("/groups/404")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    async def test_edit_group(self, client: TestClient, group: Group):
        group.name = new_name = "Salon"

        # Update a group that doesn't exist. It should return a 404 error.
        response = await client.put("/groups/666", json=group.dict())
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Update the group's name.
        response = await client.put(f"/groups/{group.id}", json=group.dict())
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group

        # Check the name has changed
        response = await client.get(f"/groups/{group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json().get("name") == new_name

    async def test_get_devices(self, client: TestClient, group: Group, device_group: Device):
        # Check that the device is in the group
        response = await client.get(f"/groups/{group.id}/devices")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == [device_group]

    async def test_add_device(self, client: TestClient, group: Group, device: Device, device_group: Device):
        device.groupId = group.id
        # Add a device in the group
        response = await client.put(f"/devices/{device.id}", json=device.dict())
        assert response.status_code == status.HTTP_200_OK

        # Check that the device has been added in the group
        response = await client.get(f"/groups/{group.id}/devices")
        assert response.status_code == status.HTTP_200_OK
        assert device in response.json()

    async def test_delete_group(self, client: TestClient, group: Group, device_group: Device):
        # Check for a group that doesn't exists
        response = await client.delete("/groups/666")
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Delete the group.
        response = await client.delete(f"/groups/{group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group

        # Check that the group does not exists anymore.
        response = await client.get("/groups")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == []

        # Check if the device was removed from the group
        response = await client.get(f"/devices/{device_group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["groupId"] is None

        # Remove the device
        response = await client.delete(f"/devices/{device_group.id}")
        assert response.status_code == status.HTTP_200_OK
