from datetime import datetime, timedelta

import pytest
from api.models.timetables import Timetable

timetable = Timetable(
    id=1, action="off", start=datetime.now(), duration=timedelta(minutes=5), repeat=timedelta(weeks=1)
)
modified_timetable = Timetable(
    id=1, action="on", start=datetime.now(), duration=timedelta(minutes=3), repeat=timedelta(days=1)
)
timetable2 = Timetable(
    id=2, action="click", start=datetime.now(), duration=timedelta(seconds=60), repeat=timedelta(minutes=10)
)


class TestTimetable:
    @pytest.mark.asyncio
    async def test_add(self, apatch):
        apatch('api.schemas.db.execute', return_value=1)
        assert timetable == await Timetable.add(timetable)

        apatch('api.schemas.db.execute', return_value=2)
        assert timetable2 == await Timetable.add(timetable2)

    @pytest.mark.asyncio
    async def test_get(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=timetable.dict())
        assert timetable == await Timetable.get(timetable.id)

        apatch('api.schemas.db.fetch_one', return_value=timetable2.dict())
        assert timetable2 == await Timetable.get(timetable2.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Timetable.get(69) is None

    @pytest.mark.asyncio
    async def test_get_all(self, apatch):
        apatch('api.schemas.db.fetch_all', return_value=[timetable.dict()])
        assert [timetable] == await Timetable.get_all()

    @pytest.mark.asyncio
    async def test_edit(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_timetable.dict())
        assert modified_timetable == await Timetable.edit(timetable.id, modified_timetable)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Timetable.edit(0, modified_timetable) is None

    @pytest.mark.asyncio
    async def test_delete(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_timetable.dict())
        assert modified_timetable == await Timetable.delete(modified_timetable.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Timetable.delete(0) is None
