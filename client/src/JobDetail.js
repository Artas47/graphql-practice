import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jobs } from './fake-data';
import { loadJob } from './requests';

export const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    const getJob = async () => {
      const response = await loadJob(jobId);
      setJob(response);
    };
    getJob();
  }, []);

  if (!job) {
    return null;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
