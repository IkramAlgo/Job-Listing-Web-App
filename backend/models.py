from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()

class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    job_type = db.Column(db.String(50))
    location = db.Column(db.String(100))
    posting_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    tags = db.Column(db.String(200))  # store tags as comma-separated string

    def __repr__(self):
        return f'<Job {self.title} at {self.company}>'
