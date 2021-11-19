import pytest
from api.models.graph import Graph
from api.models.devices import Device


class TestGraph:
    graph = Graph(id=1, deviceId=2, name="graphe de température", axisLabel="X")
    modified_graph = Graph(id=1, deviceId=2, name="graphe de chaleur", axisLabel="X")
    graph2 = Graph(id=2, deviceId=1, name="graphe d'autre chose", axisLabel="Y")
    device = Device(id=4, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9")

    @pytest.mark.asyncio
    async def test_add(self, db):
        assert self.graph == await Graph.add(self.graph)

    @pytest.mark.asyncio
    async def test_get(self, db):
        assert self.graph == await Graph.get(self.graph.id)
        assert await Graph.get(14) is None
    
    @pytest.mark.asyncio
    async def test_edit(self, db):
        assert self.modified_graph == await Graph.edit(self.graph.id, self.modified_graph)
        assert self.modified_graph == await Graph.get(self.modified_graph.id)
        assert self.graph != await Graph.get(self.graph.id)
    
    @pytest.mark.asyncio
    async def test_delete(self, db):
        assert self.modified_graph == await Graph.delete(self.modified_graph.id)
        assert await Graph.get(self.modified_graph.id) is None

    @pytest.mark.asyncio
    async def test_get_all(self, db):
        TestGraph.device = await Device.add(self.device)

        await Graph.add(self.graph2)
        assert len(await Graph.get_all()) == 1
        await Graph.delete(self.device)
