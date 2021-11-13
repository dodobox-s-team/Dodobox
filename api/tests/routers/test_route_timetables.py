from datetime import datetime, timedelta

from api.models.timetables import Timetable
from fastapi import status
from fastapi.testclient import TestClient


class TestRouteTimetable:
    prefix = "/timetables"
    timetable = Timetable(id=3,
                          action="off",
                          start=datetime.now(tz=None),
                          duration=timedelta(minutes=5),
                          repeat=timedelta(weeks=1))
    timetable_edit = Timetable(id=3,
                               action="on",
                               start=datetime.now(tz=None),
                               duration=timedelta(minutes=6),
                               repeat=timedelta(weeks=7))

    def test_add_timetables(self, client: TestClient):
        responseAdd = client.post(self.prefix + "", data=self.timetable.json())
        timetableAdd = Timetable(**responseAdd.json())
        assert responseAdd.status_code == status.HTTP_200_OK
        responseGet = client.get(self.prefix + f"/{responseAdd.json()['id']}")
        timetableGet = Timetable(**responseGet.json())
        assert timetableAdd == timetableGet
        # responseErrorAction = client(post

    def test_get_timetables_id(self, client: TestClient):
        response = client.get(self.prefix + f"/{self.timetable.id}")
        assert response.status_code == status.HTTP_200_OK
        assert self.timetable == Timetable(**response.json())
        response = client.get(self.prefix + "/666")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_edit_a_timetable(self, client: TestClient):
        response = client.put(self.prefix + f"/{self.timetable.id}", data=self.timetable_edit.json())
        assert self.timetable_edit == Timetable(**response.json())
        assert self.timetable != Timetable(**response.json())
        assert self.timetable_edit == Timetable(**client.get(self.prefix + f"/{response.json()['id']}").json())
        response = client.put(self.prefix + "10", data=self.timetable_edit.json())
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_timetable(self, client: TestClient):
        response = client.delete(self.prefix + f"/{self.timetable.id}")
        assert response.status_code == status.HTTP_200_OK
        response = client.get(self.prefix + f"/{self.timetable.id}")
        assert response.status_code == status.HTTP_404_NOT_FOUND
        response = client.delete(self.prefix + f"/{self.timetable.id}")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_get_timetables(self, client: TestClient):
        response = client.get(self.prefix)
        assert response.status_code == status.HTTP_200_OK
        print(response.json())
        print(response.status_code)
        assert len(response.json()) == 1
