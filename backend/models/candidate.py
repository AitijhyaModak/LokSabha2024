from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Candidate(db.model):
    __tablename__ = "candidates"

    id = db.Column(db.String, primary_key = True) 
    name = db.Column(db.String, nullable = False)
    constituency_name = db.Column(db.String, nullable = False)
    constituency_id = db.Column(db.String)
    age = db.Column(db.Integer)
    assets = db.Column(db.String)
    liabilities = db.Column(db.String)
    integer_assets = db.Column(db.Integer)
    integer_liabilites = db.Column(db.Integer)
    education_category = db.Column(db.String)
    education_details = db.Column(db.String)
    criminal_cases = db.Column(db.Integer)
    # votes_received = db.Column(db.Integer)
    # rank = db.Column(db.Integer)
    party = db.Column(db.String)