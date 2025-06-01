import React, { useEffect, useState } from 'react';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    job_type: string;
    tags: string[];
}

interface ApiResponse {
    jobs: Job[];
    page: number;
    pages: number;
}

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchJobs = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
        const res = await fetch(`http://127.0.0.1:5000/jobs?page=${pageNumber}`);
        const data: ApiResponse = await res.json();
        setJobs(data.jobs);
        setPage(data.page);
        setPages(data.pages);
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    fetchJobs(page);
}, [page]);

return (

<div>
    <h1>Job Listings</h1>
    {loading && <p>Loading jobs...</p>}
    {!loading && jobs.length === 0 && <p>No jobs found.</p>}
    <ul>
        {jobs.map((job) => (
            <li key={job.id}>
            <strong>{job.title}</strong> at {job.company} ({job.location})<br />
            Type: {job.job_type}<br />
            Tags: {job.tags.join(', ')}
            </li>
        ))}
    </ul>
    <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span> Page {page} of {pages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === pages}>Next</button>
    </div>
    </div>
);
};

export default JobList;
