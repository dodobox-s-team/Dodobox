import pytest
from datetime import datetime, timedelta
from api.schemas import db as database

class GraphData:
    graphData = GraphData(time=datetime.now(), graphId=1, value=24.5)
    modified_graphData = GraphData(time=datetime.now(), graphId=1, value=27.5)
    graphData2 = GraphData(time=datetime.now(), graphId=2, value=20.5)

    @pytest.mark.asyncio
    async def test_add(self, db):
        assert self.graphData == await GraphData.add(self.graphData)

    @pytest.mark.asyncio
    async def test_get(self, db):
        assert self.graphData == await GraphData.get(self.graphData)

    @pytest.mark.asyncio
    async def test_update(self, db):
        assert self.modified_graphData == await GraphData.edit(self.graphData.graphId, self.modified_graphData)
        assert self.modified_graphData == await GraphData.get(self.modified_graphData)
        assert self.graphData != await GraphData.get(self.graphData)

    @pytest.mark.asyncio
    async def test_edit(self, db):
        assert self.modified_graphData == await GraphData.edit(self.graphData.graphId, self.modified_graphData)
        assert self.modified_graphData == await GraphData.get(self.modified_graphData)
        assert self.graphData != await GraphData.get(self.graphData)
    
    @pytest.mark.asyncio
    async def test_delete(self, db):
        assert self.modified_graphData ==await GraphData.delete(self.modified_graphData.graphId)
        assert await GraphData.get(self.modified_graphData.graphId) is None
