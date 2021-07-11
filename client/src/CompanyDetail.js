import React, { useState, useEffect } from 'react';
import { loadCompany } from './requests';
import { useParams } from 'react-router';
import { JobList } from './JobList';

export const CompanyDetail = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      const response = await loadCompany(companyId);
      setCompany(response);
    };
    getCompany();
  }, [companyId]);

  if (!company) {
    return null;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
};
