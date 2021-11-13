from api.models.devices import Device
from api.models.groups import Group
from fastapi import status
from fastapi.testclient import TestClient


class TestRouteGroup:
    group = Group(name="salon")
    device = Device(name="Lampe", modele="", type=1, ip="192.168.1.5")

    def test_add_group(self, client: TestClient):
        group = self.group.dict()
        # Add a group
        response = client.post("/groups", json=group)
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.json().get("id"), int)  # The id must be given and should be an integer
        self.group.id = response.json().get("id")  # Assign it so we can use it later and use Pydantic validation
        assert response.json() == self.group

        # Make that two groups cannot have the same name
        response = client.post("/groups", json=group)
        assert response.status_code == status.HTTP_409_CONFLICT

    def test_get_groups(self, client: TestClient):
        # Check if the group we added in the previous test has been added.
        # We run the tests against a fresh database every time, so it should contain only our group.
        response = client.get("/groups")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == [self.group]

    def test_get_group(self, client: TestClient):
        # Also check that the path to the individual resource works
        response = client.get(f"/groups/{self.group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == self.group

        # Get a nonexistant resource should return 404
        response = client.get("/groups/404")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_edit_group(self, client: TestClient):
        group = self.group.dict()
        group["name"] = "Salon"

        # Update a group that doesn't exist. It should return a 404 error.
        response = client.put("/groups/666", json=group)
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Update the group's name.
        response = client.put(f"/groups/{self.group.id}", json=group)
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == group

        # Update the new name for the following tests.
        self.group.name = response.json()["name"]

    def test_get_devices(self, client: TestClient):
        # Add a device in the group
        self.device.groupId = self.group.id
        response = client.post("/devices", json=self.device.dict())
        assert response.status_code == status.HTTP_200_OK
        # Update the device for later validations
        self.device.id = response.json()["id"]

        # Check that the device is in the group
        response = client.get(f"/groups/{self.group.id}/devices")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == [self.device]

    def test_delete_group(self, client: TestClient):
        # Check for a group that doesn't exists
        response = client.delete("/groups/666")
        assert response.status_code == status.HTTP_404_NOT_FOUND

        # Delete the group.
        response = client.delete(f"/groups/{self.group.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == self.group

        # Check that the group does not exists anymore.
        response = client.get("/groups")
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == []

        # Check if the device was removed from the group
        response = client.get(f"/devices/{self.device.id}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()["groupId"] is None

        # Remove the device
        response = client.delete(f"/devices/{self.device.id}")
        assert response.status_code == status.HTTP_200_OK
