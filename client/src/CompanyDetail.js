import React from 'react';
import { companies } from './fake-data';
import { useParams } from 'react-router';

export const CompanyDetail = () => {
  const { companyId } = useParams();
  const company = companies.find((companyItem) => companyItem.id === companyId);

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
