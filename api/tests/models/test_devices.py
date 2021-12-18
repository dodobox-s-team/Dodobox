import pytest
from api.models.devices import Device

pytestmark = pytest.mark.asyncio

device = Device(id=1, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9", toggle=True)
modified_device = Device(id=1, groupId=None, name="prise pas du salon",
                         modele="esp32", type=0, ip="192.168.1.9", toggle=False)
device2 = Device(id=2, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9", toggle=True)


class TestDevice:
    async def test_add(self, apatch):
        apatch('api.schemas.db.execute', return_value=1)
        assert device == await Device.add(device)

        apatch('api.schemas.db.execute', return_value=2)
        assert device2 == await Device.add(device2)

    async def test_get(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=device.dict())
        assert device == await Device.get(device.id)

        apatch('api.schemas.db.fetch_one', return_value=device2.dict())
        assert device2 == await Device.get(device2.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.get(0) is None

    async def test_get_toggle(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=device.toggle)
        assert device.toggle == await Device.get_toggle(device.id)

        apatch('api.schemas.db.fetch_one', return_value=device2.toggle)
        assert device2.toggle == await Device.get_toggle(device2.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.get_toggle(0) is None

    async def test_get_all(self, apatch):
        apatch('api.schemas.db.fetch_all', return_value=[device.dict()])
        assert [device] == await Device.get_all()

    async def test_update(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_device.dict())
        assert modified_device == await Device.update(device.id, name=modified_device.name)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.update(0, name=modified_device.name) is None

    async def test_edit_toggle(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_device.dict())
        assert modified_device == await Device.edit_toggle(device.id, False, device)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.edit_toggle(0, False, device) is None

    async def test_edit(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_device.dict())
        assert modified_device == await Device.edit(device.id, modified_device)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.edit(0, modified_device) is None

    async def test_delete(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=device)
        assert device == await Device.delete(device.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Device.delete(0) is None
