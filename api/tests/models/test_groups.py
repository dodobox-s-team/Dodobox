import pytest
from api.models.devices import Device
from api.models.groups import Group
from asyncpg import UniqueViolationError
from pytest_mock import MockerFixture

pytestmark = pytest.mark.asyncio

group = Group(id=1, name="salon")
modified_group = Group(id=1, name="Salon")
group2 = Group(id=2, name="Cuisine")
device = Device(name="Lampe", modele="", groupId=1, type=1, ip="192.168.1.5", toggle=True)


class TestGroup:
    async def test_add(self, apatch, mocker: MockerFixture):
        apatch('api.schemas.db.execute', return_value=1)
        assert group == await Group.add(group)

        apatch('api.schemas.db.execute', return_value=2)
        assert group2 == await Group.add(group2)

        # Check that two groups cannot have the same name
        mocker.patch('api.schemas.db.execute', side_effect=UniqueViolationError())
        with pytest.raises(UniqueViolationError):
            await Group.add(group)

    async def test_get(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=group.dict())
        assert group == await Group.get(group.id)

        apatch('api.schemas.db.fetch_one', return_value=group2.dict())
        assert group2 == await Group.get(group2.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Group.get(0) is None

    async def test_get_all(self, apatch):
        apatch('api.schemas.db.fetch_all', return_value=[group.dict()])
        assert [group] == await Group.get_all()

    async def test_update(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_group.dict())
        assert modified_group == await Group.update(group.id, name=modified_group.name)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Group.update(0, name=modified_group.name) is None

    async def test_edit(self, apatch):
        apatch('api.schemas.db.fetch_one', return_value=modified_group.dict())
        assert modified_group == await Group.edit(group.id, modified_group)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Group.edit(0, modified_group) is None

    async def test_delete(self, apatch, mocker):
        mocker.patch('api.schemas.db.execute')
        apatch('api.schemas.db.fetch_one', return_value=group.dict())
        assert group == await Group.delete(group.id)

        apatch('api.schemas.db.fetch_one', return_value=None)
        assert await Group.delete(0) is None

    async def test_get_devices(self, apatch):
        apatch('api.schemas.db.fetch_all', return_value=[device.dict()])
        assert [device] == await Group.get_devices(group.id)

    async def test_delete_with_devices(self, apatch, mocker):
        def reset_groupId(query):
            device.groupId = None

        mocker.patch('api.schemas.db.execute', side_effect=reset_groupId)
        apatch('api.schemas.db.fetch_one', return_value=group.dict())
        assert group == await Group.delete(group.id)

        apatch('api.schemas.db.fetch_one', return_value=device.dict())
        # Check that the device doesn't have a group anymore
        assert (await Device.get(device.id)).groupId is None
