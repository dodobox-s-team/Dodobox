import asyncio
import os

from fastapi import FastAPI

from api.schemas import db

DB_RETRIES = int(os.getenv("DB_RETRIES", 3))

app = FastAPI(title="Dodobox", root_path="/api")


@app.on_event("startup")
async def startup():
    exception = None
    for retries in range(DB_RETRIES):
        try:
            await db.connect()
            break
        except ConnectionRefusedError as e:
            exception = e
            backoff = 2 ** retries / 10
            print(f"Couldn't connect to the database. Retrying in {backoff}s.")
            await asyncio.sleep(backoff)
    else:
        raise exception


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
