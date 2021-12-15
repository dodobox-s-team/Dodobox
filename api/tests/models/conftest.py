from typing import Any

import pytest
from pytest_mock import MockerFixture


@pytest.fixture
def apatch(mocker: MockerFixture):
    """Return a function that let you patch an async function."""
    def patch(target: str, return_value: Any):
        return mocker.patch(target, side_effect=mocker.AsyncMock(return_value=return_value))

    yield patch
