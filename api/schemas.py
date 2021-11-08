import os

import sqlalchemy
from databases import Database
from sqlalchemy import DDL, Column, DateTime, ForeignKey, Integer, Interval, Numeric, String, Table, event

db = Database(os.environ["DATABASE_URL"])

metadata = sqlalchemy.MetaData()

devices = Table(
    "devices",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("groupId", Integer, ForeignKey('groups.id')),
    Column("name", String(64), nullable=False),
    Column("modele", String(64), nullable=False),
    Column("type", Integer, nullable=False),
    Column("ip", String(15)),
)

groups = Table(
    "groups",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(64), nullable=False, unique=True),
)

timetables = Table(
    "timetables",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("action", String(16), nullable=False),
    Column("start", DateTime, nullable=False),
    Column("duration", Interval, nullable=False),
    Column("repeat", Interval, nullable=False),
)

group_timetables = Table(
    "group_timetables",
    metadata,
    Column("groupId", Integer, ForeignKey('groups.id'), primary_key=True),
    Column("timetableId", Integer, ForeignKey('timetables.id'), primary_key=True),
)

device_timetables = Table(
    "device_timetables",
    metadata,
    Column("deviceId", Integer, ForeignKey('devices.id'), primary_key=True),
    Column("timetableId", Integer, ForeignKey('timetables.id'), primary_key=True),
)

graphs = Table(
    "graphs",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("deviceId", Integer, ForeignKey('devices.id'), nullable=False),
    Column("name", String(64), nullable=False),
    Column("axisLabel", String(64), nullable=False),
)

graphData = Table(
    "graphData",
    metadata,
    Column("time", DateTime, nullable=False),
    Column("graphId", Integer, ForeignKey('graphs.id'), nullable=False),
    Column("value", Numeric, nullable=False),
)

# Create the hypertable for time-scale data
event.listen(
    graphData,
    "after_create",
    DDL(f"SELECT create_hypertable({graphData.name!r}, {graphData.c.time.name!r});")
)
