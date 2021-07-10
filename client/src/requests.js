const SERVER_URL = 'http://localhost:9000/graphql';

const graphqlRequest = async (query, variables = {}) => {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((err) => err.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
};

export const loadCompany = async (companyId) => {
  const query = `
  query CompanyQuery($companyId: ID!){
    company(id: $companyId) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
  `;
  const { company } = await graphqlRequest(query, { companyId });
  return company;
};

export const loadJob = async (jobId) => {
  const query = `
  query JobQuery($jobId: ID!){
    job(id: $jobId) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
  `;
  const { job } = await graphqlRequest(query, { jobId });
  return job;
};

export const loadJobs = async () => {
  const query = `
  {
    jobs {
      id,
      title,
      company {
        id,
        name,
      }
    }
  }
  `;
  const { jobs } = await graphqlRequest(query);
  return jobs;
};
