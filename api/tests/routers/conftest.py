import pytest
from api.main import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c
