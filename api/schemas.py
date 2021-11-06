import os

import sqlalchemy
from databases import Database
from sqlalchemy import Column, DateTime, ForeignKey, Integer, Interval, String, Table

db = Database(os.environ["DATABASE_URL"])

metadata = sqlalchemy.MetaData()

devices = Table(
    "devices",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("groupId", Integer),
    Column("name", String(64), nullable=False),
    Column("modele", String(64), nullable=False),
    Column("type", Integer, nullable=False),
    Column("ip", String(15)),
)

groups = Table(
    "groups",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(64), nullable=False),
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

device_data = Table(
    "device_data",
    metadata,
    Column("device_dataId", Integer, ForeignKey('devices.id'), primary_key=True),
    Column("data", Integer, nullable=True),
)
