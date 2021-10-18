"""Add device and group tables

Revision ID: 14975a09aca2
Revises:
Create Date: 2021-10-17 18:56:50.737705

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14975a09aca2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('devices',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('groupId', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('modele', sa.String(length=64), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.Column('ip', sa.String(length=15), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('groups',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('groups')
    op.drop_table('devices')
    # ### end Alembic commands ###
