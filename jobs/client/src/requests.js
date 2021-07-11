import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client/core';
import { getAccessToken, isLoggedIn } from './auth';

const SERVER_URL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + getAccessToken(),
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: SERVER_URL })]),
  cache: new InMemoryCache(),
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

const jobQuery = gql`
  query JobQuery($jobId: ID!) {
    job(id: $jobId) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const loadCompanyQuery = gql`
  query CompanyQuery($companyId: ID!) {
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

const loadJobsQuery = gql`
  {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

export const createJob = async (input) => {
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { jobId: data.job.id },
        data,
      });
    },
  });
  return job;
};

export const loadCompany = async (companyId) => {
  const {
    data: { company },
  } = await client.query({ query: loadCompanyQuery, variables: { companyId } });
  return company;
};

export const loadJob = async (jobId) => {
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { jobId } });
  return job;
};

export const loadJobs = async () => {
  const {
    data: { jobs },
  } = await client.query({ query: loadJobsQuery, fetchPolicy: 'no-cache' });
  return jobs;
};
