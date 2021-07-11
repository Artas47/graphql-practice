import { getAccessToken, isLoggedIn } from './auth';

const SERVER_URL = 'http://localhost:9000/graphql';

const graphqlRequest = async (query, variables = {}) => {
  const request = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers['authorization'] = 'Bearer ' + getAccessToken();
  }
  const response = await fetch(SERVER_URL, request);

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((err) => err.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
};

export const createJob = async (input) => {
  const mutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { job } = await graphqlRequest(mutation, { input });
  return job;
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
