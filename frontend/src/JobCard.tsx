import React from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { MapPinIcon, CalendarIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

interface Job {
id: number;
title: string;
company: string;
location: string;
job_type?: string | null;
tags: string[];
posting_date?: string;
logo?: string | null;
}

interface JobCardProps {
job: Job;
onDelete: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
return (
<Card className="mb-4 shadow-sm hover-shadow position-relative">
    <Button
    variant="danger"
    size="sm"
    className="position-absolute top-0 end-0 m-2"
    onClick={() => onDelete(job.id)}
    title="Delete Job"
    >
    &times;
    </Button>
    <Card.Body>
    <Row className="align-items-center mb-3">
        <Col xs={2} md={1}>
        <img
            src={
            job.logo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}`
            }
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
        <div className="d-flex align-items-center mb-2 text-muted">
        <MapPinIcon className="icon-size me-2" />
        {job.location || 'N/A'}
        </div>
        <div className="d-flex align-items-center mb-2 text-muted">
        <BriefcaseIcon className="icon-size me-2" />
        {job.job_type || 'N/A'}
        </div>
        <div className="d-flex align-items-center mb-2 text-muted">
        <CalendarIcon className="icon-size me-2" />
        {job.posting_date
            ? new Date(job.posting_date).toLocaleDateString()
            : 'N/A'}
        </div>
        <div className="mt-3">
        {job.tags
            .filter((tag) => tag && tag.trim() !== '')
            .map((tag, idx) => (
            <Badge bg="primary" className="me-1" key={idx}>
                {tag}
            </Badge>
            ))}
        </div>
    </Card.Text>
    </Card.Body>
</Card>
);
};

export default JobCard;
