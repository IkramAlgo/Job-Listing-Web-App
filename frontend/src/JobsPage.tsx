import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, InputGroup } from 'react-bootstrap';

const JobCard = ({ job, onDelete }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <Button
        variant="danger"
        size="sm"
        className="position-absolute top-0 end-0 m-2"
        onClick={() => onDelete(job.id)}
        title="Delete Job"
      >
        &times;
      </Button>
      <Row className="align-items-center mb-3">
        <Col xs={2} md={1}>
          <img
            src={job.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}`}
            alt={job.company}
            className="img-fluid rounded-circle"
          />
        </Col>
        <Col>
          <Card.Title className="mb-0">{job.title}</Card.Title>
          <Card.Subtitle className="text-muted">{job.company}</Card.Subtitle>
        </Col>
      </Row>
      <Card.Text>
        <div>
          <strong>Location:</strong> {job.location || 'N/A'}
        </div>
        {job.salary && (
          <div>
            <strong>Salary:</strong> {job.salary}
          </div>
        )}
        <div className="mt-2">
          {job.tags?.map((tag, idx) => (
            <Badge bg="primary" className="me-1" key={idx}>
              {tag}
            </Badge>
          ))}
        </div>
      </Card.Text>
      <Card.Footer className="text-muted text-end">
        Posted: {job.posting_date ? new Date(job.posting_date).toLocaleDateString() : 'N/A'}
      </Card.Footer>
    </Card.Body>
  </Card>
);

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Add job form state
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    tags: '',
    logo: '',
  });

  const perPage = 9;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('per_page', perPage.toString());
      if (locationFilter) params.append('location', locationFilter);
      if (jobTypeFilter) params.append('job_type', jobTypeFilter);
      if (tagsFilter) params.append('tags', tagsFilter);

      const res = await fetch(`http://127.0.0.1:5000/jobs?${params.toString()}`);
      const data = await res.json();
      setJobs(data.jobs);
      setPages(data.pages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [page, locationFilter, jobTypeFilter, tagsFilter]);

  const handleAddJob = async (e) => {
    e.preventDefault();
    const jobToAdd = {
      ...newJob,
      tags: newJob.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch('http://127.0.0.1:5000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobToAdd),
      });
      if (res.ok) {
        setNewJob({ title: '', company: '', location: '', salary: '', tags: '', logo: '' });
        fetchJobs();
      } else {
        alert('Failed to add job');
      }
    } catch (error) {
      alert('Error adding job');
      console.error(error);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) fetchJobs();
      else alert('Failed to delete job');
    } catch (error) {
      alert('Error deleting job');
      console.error(error);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Job Listings</h1>

      {/* Filters */}
      <Row className="mb-4 g-3 justify-content-center">
        <Col xs={12} sm={6} md={3}>
          <Form.Control
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Form.Control
            placeholder="Filter by job type"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={12} md={4}>
          <Form.Control
            placeholder="Filter by tags (comma separated)"
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-danger"
            onClick={() => {
              setLocationFilter('');
              setJobTypeFilter('');
              setTagsFilter('');
              setPage(1);
            }}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>

      {/* Add Job Form */}
      <Card className="mb-5 p-3">
        <h2>Add New Job</h2>
        <Form onSubmit={handleAddJob}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                required
                placeholder="Job Title"
                name="title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                required
                placeholder="Company"
                name="company"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Location"
                name="location"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Salary (e.g. $60k-$75k)"
                name="salary"
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Tags (comma separated)"
                name="tags"
                value={newJob.tags}
                onChange={(e) => setNewJob({ ...newJob, tags: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Logo URL (optional)"
                name="logo"
                value={newJob.logo}
                onChange={(e) => setNewJob({ ...newJob, logo: e.target.value })}
              />
            </Col>
          </Row>
          <Button className="mt-3" type="submit" variant="success">
            Add Job
          </Button>
        </Form>
      </Card>

      {/* Job Cards */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        <Row xs={1} sm={2} md={3}>
          {jobs.map((job) => (
            <Col key={job.id}>
              <JobCard job={job} onDelete={handleDeleteJob} />
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {page} of {pages}
        </span>
        <Button
          variant="secondary"
          disabled={page === pages}
          onClick={() => setPage((p) => Math.min(p + 1, pages))}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default JobsPage;
