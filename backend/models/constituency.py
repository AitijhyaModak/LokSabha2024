from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Constituency(db.model):
    __tablename__ = "constituencies"

    id = db.Column(db.String, primary_key = True) 
    name = db.Column(db.String, nullable = False)
    state_name = db.Column(db.String, nullable = False)
    winner_candidate_id = db.Column(db.String, nullable = False)
    winner_party_id = db.Column(db.String, nullable = False)
    geojson_id = db.Column(db.String, nullable = False)
