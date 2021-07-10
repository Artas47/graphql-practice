import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { jobs } from './fake-data';

export const JobDetail = () => {
  const { jobId } = useParams();

  const job = jobs.find((job) => job.id === jobId);

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
