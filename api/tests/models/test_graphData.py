import pytest
from datetime import datetime
from api.models.graphData import GraphData

pytestmark = pytest.mark.asyncio

graphData = GraphData(time=datetime.now(), graphId=1, value=24.5)
modified_graphData = GraphData(time=datetime.now(), graphId=1, value=27.5)
graphData2 = GraphData(time=datetime.now(), graphId=2, value=20.5)


class TestGraphData:
    async def test_add(self, apatch):
        apatch("api.schemas.db.execute", return_value=1)
        assert graphData == await GraphData.add(graphData)

        apatch("api.schemas.db.execute", return_value=2)
        assert graphData2 == await GraphData.add(graphData2)

    async def test_get(self, apatch):
        apatch("api.schemas.db.fetch_all", return_value=[graphData.dict()])
        assert [graphData] == await GraphData.get()

    async def test_get_all(self, apatch):
        apatch("api.schemas.db.fetch_all", return_value=[graphData.dict()])
        assert [graphData] == await GraphData.get_all()

    async def test_delete(self, apatch):
        apatch("api.schemas.db.fetch_one", return_value=graphData)
        assert graphData == await GraphData.delete(graphData.graphId)

        apatch("api.schemas.db.fetch_one", return_value=None)
        assert await GraphData.delete(0) is None

    async def test_get_latest(self, apatch):
        apatch("api.schemas.db.fetch_one", return_value=graphData.dict())
        assert graphData == await GraphData.get_latest()
