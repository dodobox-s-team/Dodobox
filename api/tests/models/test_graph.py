import pytest
from api.models.graph import Graph
from api.models.devices import Device

pytestmark = pytest.mark.asyncio

graph = Graph(id=1, deviceId=2, name="graphe de température", axisLabel="X")
modified_graph = Graph(id=1, deviceId=2, name="graphe de chaleur", axisLabel="X")
graph2 = Graph(id=2, deviceId=1, name="graphe d'autre chose", axisLabel="Y")
device = Device(id=4, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9", toggle=True)


class TestGraph:
    async def test_add(self, apatch):
        apatch('api.schemas.db.execute', return_value=1)
        assert graph == await Graph.add(graph)

    async def test_get(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=graph.dict())
        assert graph == await Graph.get(graph.id)
        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Graph.get(14) is None
    
    async def test_edit(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_graph.dict())
        assert modified_graph == await Graph.edit(graph.id, modified_graph)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Graph.edit(0, modified_graph) is None
    
    async def test_delete(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_graph.dict())
        assert modified_graph == await Graph.delete(modified_graph.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Graph.delete(0) is None

    async def test_get_all(self, apatch):
        apatch('api.schemas.db.fetch_all', return_value=[graph.dict()])
        assert [graph] == await Graph.get_all()
