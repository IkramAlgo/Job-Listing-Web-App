from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app)

username = "postgres"
password = "0101"
database = "job_app_db"

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{username}:{password}@localhost:5432/{database}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    posting_date = db.Column(db.DateTime, default=datetime.utcnow)
    job_type = db.Column(db.String(50))
    tags = db.Column(db.JSON)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "posting_date": self.posting_date.isoformat(),
            "job_type": self.job_type,
            "tags": self.tags
        }

@app.route('/')
def index():
    return jsonify({"message": "Job API is running"})

@app.route('/jobs', methods=['GET'])
def get_jobs():
    # Filtering query parameters
    location = request.args.get('location')
    job_type = request.args.get('job_type')
    tags = request.args.getlist('tags')  # ?tags=python&tags=flask

    # Pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    query = Job.query

    if location:
        query = query.filter(Job.location.ilike(f'%{location}%'))
    if job_type:
        query = query.filter(Job.job_type.ilike(f'%{job_type}%'))
    if tags:
        # Filter jobs that contain all tags requested
        for tag in tags:
            query = query.filter(Job.tags.contains([tag]))

    pagination = query.order_by(Job.posting_date.desc()).paginate(page=page, per_page=per_page, error_out=False)
    jobs = pagination.items

    return jsonify({
        "jobs": [job.to_dict() for job in jobs],
        "total": pagination.total,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "pages": pagination.pages
    })

@app.route('/jobs', methods=['POST'])
def add_job():
    data = request.get_json()
    required_fields = ['title', 'company']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"'{field}' is required"}), 400

    new_job = Job(
        title=data.get('title'),
        company=data.get('company'),
        location=data.get('location'),
        job_type=data.get('job_type'),
        tags=data.get('tags') or []
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify(new_job.to_dict()), 201

@app.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    job = Job.query.get_or_404(job_id)
    data = request.get_json()

    job.title = data.get('title', job.title)
    job.company = data.get('company', job.company)
    job.location = data.get('location', job.location)
    job.job_type = data.get('job_type', job.job_type)
    job.tags = data.get('tags', job.tags)

    db.session.commit()
    return jsonify(job.to_dict())

@app.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return '', 204

@app.route('/jobs/company/<string:company_name>', methods=['GET'])
def get_jobs_by_company(company_name):
    jobs = Job.query.filter(Job.company.ilike(f'%{company_name}%')).all()
    return jsonify([job.to_dict() for job in jobs])

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
