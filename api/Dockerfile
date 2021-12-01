FROM python:3-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /

# INSTALL THE BUILD DEP.
COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq-dev gcc libc-dev libffi-dev && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir -U setuptools wheel && \
    pip install --no-cache-dir -r ./requirements.txt && \
    apt-get remove -y gcc libc-dev libffi-dev && \
    apt-get autoremove -y && \
    pip uninstall -y setuptools wheel pip

# COPY APP SOURCE CODE
COPY . /api

# CREATE IMAGES FOLDER
RUN mkdir /images