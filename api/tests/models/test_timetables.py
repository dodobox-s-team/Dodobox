import pytest
from api.models.timetables import Timetable
from datetime import datetime, timedelta

class TestTimetable:
    timetable = Timetable(id=1, action="off", start=datetime.now(), duration=timedelta(minutes=5), repeat=timedelta(weeks=1))
    edit_timetable = Timetable(id=1, action="on", start=datetime.now(), duration=timedelta(minutes=3), repeat=timedelta(days=1))
    timetable2 = Timetable(id=2, action="click", start=datetime.now(), duration=timedelta(seconds=60), repeat=timedelta(minutes=10))

    @pytest.mark.asyncio
    async def test_add(self, db):
        assert self.timetable == await Timetable.add(self.timetable)

    @pytest.mark.asyncio
    async def test_get(self, db):
        assert self.timetable == await Timetable.get(self.timetable.id)
        assert await Timetable.get(69) is None

    @pytest.mark.asyncio
    async def test_edit(self, db):
        assert self.edit_timetable == await Timetable.edit(self.timetable.id, self.edit_timetable)
        assert self.edit_timetable == await Timetable.get(self.edit_timetable.id)
        assert self.timetable != await Timetable.get(self.timetable.id)

    @pytest.mark.asyncio
    async def test_delete(self, db):
        assert self.edit_timetable == await Timetable.delete(self.edit_timetable.id)
        assert await Timetable.get(self.edit_timetable.id) is None

    @pytest.mark.asyncio
    async def test_get_all(self, db):
        await Timetable.add(self.timetable2)
        assert len(await Timetable.get_all()) == 1