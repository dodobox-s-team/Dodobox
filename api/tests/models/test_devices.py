import pytest
from api.models.devices import Device


class TestDevice:
    device = Device(id=1, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9")
    modified_device = Device(id=1, groupId=None, name="prise pas du salon", modele="esp32", type=0, ip="192.168.1.9")
    device2 = Device(id=2, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9")

    @pytest.mark.asyncio
    async def test_add(self, db):
        assert self.device == await Device.add(self.device)

    @pytest.mark.asyncio
    async def test_get(self, db):
        assert self.device == await Device.get(self.device.id)
        assert await Device.get(8) is None

    @pytest.mark.asyncio
    async def test_update(self, db):
        assert self.modified_device == await Device.edit(self.device.id, self.modified_device)
        assert self.modified_device == await Device.get(self.modified_device.id)
        assert self.device != await Device.get(self.device.id)

    @pytest.mark.asyncio
    async def test_delete(self, db):
        # Delete the device
        assert self.modified_device == await Device.delete(self.modified_device.id)
        # Check that the device were correctly deleted
        assert await Device.get(self.modified_device.id) is None

    @pytest.mark.asyncio
    async def test_get_all(self, db):
        await Device.add(self.device2)
        assert len(await Device.get_all()) == 2
