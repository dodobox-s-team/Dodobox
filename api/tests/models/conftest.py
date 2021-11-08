import pytest
from api.schemas import db as database


@pytest.fixture
async def db():
    await database.connect()
    yield database
    await database.disconnect()


@pytest.mark.asyncio
async def test_db_connection():
    await database.connect()
    await database.disconnect()
