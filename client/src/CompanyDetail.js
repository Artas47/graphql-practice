import React, { useState, useEffect } from 'react';
import { companies } from './fake-data';
import { loadCompany } from './requests';
import { useParams } from 'react-router';

export const CompanyDetail = () => {
  const { companyId } = useParams();

  const [company, setCompany] = useState(null);
  useEffect(() => {
    const getCompany = async () => {
      const response = await loadCompany(companyId);
      setCompany(response);
    };
    getCompany();
  }, []);

  if (!company) {
    return null;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
