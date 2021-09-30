from fastapi import FastAPI

app = FastAPI(title="Dodobox", root_path="/api")


@app.on_event("startup")
async def startup():
    print('Hello')


@app.on_event("shutdown")
async def shutdown():
    print('Bye')
