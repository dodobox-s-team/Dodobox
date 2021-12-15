from datetime import datetime, timedelta

import pytest
from api.models.timetables import Timetable
from fastapi import status
from fastapi.testclient import TestClient

pytestmark = pytest.mark.asyncio


@pytest.fixture
def timetable2(timetable):
    return Timetable(
        id=1,
        action="on",
        start=datetime.now(tz=None),
        duration=timedelta(minutes=3),
        repeat=timedelta(weeks=1)
    )


@pytest.fixture
def modified_timetable(timetable):
    return Timetable(
        id=11,
        action="on",
        start=datetime.now(tz=None),
        duration=timedelta(minutes=6),
        repeat=timedelta(weeks=7)
    )


class TestRouteTimetable:
    async def test_add_timetables(self, client: TestClient, timetable2: Timetable):
        # We need to use content=timetable.json() because datetime is not json serializable
        # but pydantic can serialize it.
        responseAdd = await client.post("/timetables", content=timetable2.json())
        timetableAdd = Timetable(**responseAdd.json())
        assert responseAdd.status_code == status.HTTP_200_OK

        responseGet = await client.get(f"/timetables/{timetable2.id}")
        timetableGet = Timetable(**responseGet.json())
        assert timetableAdd == timetableGet

    async def test_get_timetables_id(self, client: TestClient, timetable: Timetable):
        response = await client.get(f"/timetables/{timetable.id}")
        assert response.status_code == status.HTTP_200_OK
        assert timetable == Timetable(**response.json())

        response = await client.get("/timetables/666")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    async def test_edit_a_timetable(self, client: TestClient, timetable: Timetable, modified_timetable: Timetable):
        response = await client.put(f"/timetables/{timetable.id}", content=modified_timetable.json())
        assert modified_timetable == Timetable(**response.json())
        assert timetable != Timetable(**response.json())

        response = await client.get(f"/timetables/{response.json()['id']}")
        assert modified_timetable == Timetable(**response.json())

        response = await client.put("/timetables/10", content=modified_timetable.json())
        assert response.status_code == status.HTTP_404_NOT_FOUND

    async def test_delete_timetable(self, client: TestClient, timetable: Timetable):
        response = await client.delete(f"/timetables/{timetable.id}")
        assert response.status_code == status.HTTP_200_OK

        response = await client.get(f"/timetables/{timetable.id}")
        assert response.status_code == status.HTTP_404_NOT_FOUND

        response = await client.delete(f"/timetables/{timetable.id}")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    async def test_get_timetables(self, client: TestClient, timetable: Timetable):
        response = await client.get("/timetables")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1
