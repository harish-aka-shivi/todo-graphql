import React from 'react';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://test-323.herokuapp.com/v1/graphql',
});

const token = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GqlProvider = ({ ...props }) => (
  <ApolloProvider client={client} {...props} />
);

export default GqlProvider;
