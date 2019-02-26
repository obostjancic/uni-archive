"""
Contains configuration for database access.
"""

DRIVER = "postgresql+psycopg2"
USER = "postgres"
PASS = "0000"
HOST = "localhost:5432"
DB_NAME = "cg_triangulations"

DB_URI = "{}://{}:{}@{}/{}".format(DRIVER, USER, PASS, HOST, DB_NAME)