import pytest
from api.models.devices import Device
from api.models.groups import Group
from asyncpg import UniqueViolationError


class TestGroup:
    group = Group(id=1, name="salon")
    modified_group = Group(id=1, name="Salon")
    group2 = Group(id=2, name="Cuisine")
    device = Device(name="Lampe", modele="", type=1, ip="192.168.1.5")

    @pytest.mark.asyncio
    async def test_add(self, db):
        assert self.group == await Group.add(self.group)

        # Check that two groups cannot have the same name
        with pytest.raises(UniqueViolationError):
            await Group.add(self.group)

    @pytest.mark.asyncio
    async def test_get(self, db):
        assert self.group == await Group.get(self.group.id)
        assert await Group.get(8) is None

    @pytest.mark.asyncio
    async def test_update(self, db):
        assert self.modified_group == await Group.edit(self.group.id, self.modified_group)
        assert self.modified_group == await Group.get(self.modified_group.id)
        assert self.group != await Group.get(self.group.id)

    @pytest.mark.asyncio
    async def test_delete(self, db):
        # Delete the group
        assert self.modified_group == await Group.delete(self.modified_group.id)
        # Check that the group were correctly deleted
        assert await Group.get(self.modified_group.id) is None

    @pytest.mark.asyncio
    async def test_get_all(self, db):
        self.group2 = await Group.add(self.group2)
        print(self.group2)
        assert len(await Group.get_all()) == 1

    @pytest.mark.asyncio
    async def test_get_devices(self, db):
        self.device = await Device.add(self.device)
        self.device = await Device.update(self.device.id, groupId=self.group2.id)

        devices = await Group.get_devices(self.group2.id)
        assert len(devices) == 1 and devices[0] == self.device

    @pytest.mark.asyncio
    async def test_delete_with_devices(self, db):
        # Delete the group
        assert self.group2 == await Group.delete(self.group2.id)
        # Check that the group were correctly deleted
        assert await Group.get(self.group2.id) is None
        # Check that the device doesn't have a group anymore
        assert (await Device.get(self.device.id)).groupId is None
