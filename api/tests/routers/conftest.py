import asyncio
from datetime import datetime, timedelta
from pathlib import Path

import api.models
import pytest
from api.main import app
from api.models.devices import Device
from api.models.groups import Group
from api.models.timetables import Timetable
from api.schemas import db
from asgi_lifespan import LifespanManager
from httpx import AsyncClient


@pytest.fixture
def device(setup_database):
    return Device(id=11, groupId=None, name="prise salon", modele="esp32", type=0, ip="192.168.1.9")


@pytest.fixture
def group(setup_database):
    return Group(id=11, name="salon")


@pytest.fixture
def device_group(setup_database):
    return Device(id=12, groupId=11, name="Lampe", modele="", type=1, ip="192.168.1.5")


@pytest.fixture
def timetable(setup_database):
    return Timetable(
        id=11,
        action="off",
        start=datetime(1999, 1, 8, 4, 5, 6),
        duration=timedelta(minutes=5),
        repeat=timedelta(weeks=1)
    )


class patchdb:
    """Patch the db object with a connection."""
    def __init__(self, conn):
        self.conn = conn
        self._db = db
        self.modules = [getattr(api.models, m) for m in dir(api.models) if not m.startswith('_')]

    def _replace(self, db, value):
        """Replace all db object by another value."""
        api.schemas.db = value
        for mod in self.modules:
            if hasattr(mod, 'db') and mod.db is db:
                mod.db = value

    def __enter__(self):
        self._replace(self._db, self.conn)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._replace(self.conn, self._db)


@pytest.fixture(scope="session")
def event_loop():
    # This fixture is needed because pytest-asyncio's event loop has a function scope but the
    # `client` fixture has a session scope which is not compatible with the function scope.
    loop = asyncio.get_event_loop_policy().get_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def client():
    # httpx does not support ASGI lifecycles (e.g. startup & shutdown events)
    # See https://github.com/encode/httpx/issues/350
    async with LifespanManager(app):
        async with AsyncClient(app=app, base_url="http://test") as c:
            yield c


@pytest.fixture(scope="session")
async def setup_database(client):
    # Populate the database with values
    with open(Path(__file__).parent / 'setup.sql', 'r') as f:
        for query in f.read().split(';'):
            await db.execute(query)


@pytest.fixture(autouse=True)
async def dbtransaction(client):
    # Wrap every test by a SQL transaction and roll back any changes to the db by the tests
    # to prevent any side effect. We achieve it by replacing every instances of the database
    # object by a single connection objectto prevent issues where the transaction is rolled
    # back after the connection has been closed.
    async with db.connection() as connection:
        with patchdb(connection):
            async with connection.transaction(force_rollback=True):
                yield
