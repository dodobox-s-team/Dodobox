"""Add timetable table

Revision ID: 7db537b8750a
Revises: 14975a09aca2
Create Date: 2021-10-17 18:58:05.955179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7db537b8750a'
down_revision = '14975a09aca2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('timetables',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('action', sa.String(length=16), nullable=False),
    sa.Column('start', sa.DateTime(), nullable=False),
    sa.Column('duration', sa.Interval(), nullable=False),
    sa.Column('repeat', sa.Interval(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('device_timetables',
    sa.Column('deviceId', sa.Integer(), nullable=False),
    sa.Column('timetableId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['deviceId'], ['devices.id'], ),
    sa.ForeignKeyConstraint(['timetableId'], ['timetables.id'], ),
    sa.PrimaryKeyConstraint('deviceId', 'timetableId')
    )
    op.create_table('group_timetables',
    sa.Column('groupId', sa.Integer(), nullable=False),
    sa.Column('timetableId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['groupId'], ['groups.id'], ),
    sa.ForeignKeyConstraint(['timetableId'], ['timetables.id'], ),
    sa.PrimaryKeyConstraint('groupId', 'timetableId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('group_timetables')
    op.drop_table('device_timetables')
    op.drop_table('timetables')
    # ### end Alembic commands ###