import os

import sqlalchemy
from databases import Database

db = Database(os.environ["DATABASE_URL"])

metadata = sqlalchemy.MetaData()

