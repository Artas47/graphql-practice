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

const jobQuery = gql`
  query JobQuery($jobId: ID!) {
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

export const createJob = async (input) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput) {
      job: createJob(input: $input) {
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
  const {
    data: { job },
  } = await client.mutate({
    mutation,
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
  const query = gql`
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
  const {
    data: { company },
  } = await client.query({ query, variables: { companyId } });
  return company;
};

export const loadJob = async (jobId) => {
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { jobId } });
  return job;
};

export const loadJobs = async () => {
  const query = gql`
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
  const {
    data: { jobs },
  } = await client.query({ query, fetchPolicy: 'no-cache' });
  return jobs;
};
