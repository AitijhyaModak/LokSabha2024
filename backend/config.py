import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.abspath(BASE_DIR, "data/candidates.db")
    SQLACHEMY_TRACK_MODIFICATIONS = False
    