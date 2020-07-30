# GQL_app
Graph QL

ref: https://www.sitepoint.com/how-to-build-a-web-app-with-graphql-and-react/


1. add dependency

        "dependencies": {
          "@apollo/react-hooks": "^4.0.0",
          "@testing-library/jest-dom": "^4.2.4",
          "@testing-library/react": "^9.5.0",
          "@testing-library/user-event": "^7.2.1",
          "apollo-cache-inmemory": "^1.6.6",
          "apollo-client": "^2.6.10",
          "apollo-link-http": "^1.5.17",
          "graphql": "^15.3.0",
          "graphql-tag": "^2.11.0",
          "react": "^16.13.1",
          "react-apollo": "^3.1.5",
          "react-dom": "^16.13.1",
          "react-scripts": "3.4.1"}
    
    
2. // index.js

 create apollo server instance in index.js & wapper of App comopnent & ApolloProvider component

                import React from 'react';
                import ReactDOM from 'react-dom';
                import './index.css';
                import App from './App';
                import * as serviceWorker from './serviceWorker';
                import {ApolloClient} from 'apollo-client';
                import { InMemoryCache } from 'apollo-cache-inmemory';
                import { ApolloProvider } from '@apollo/react-hooks';

                const cache = new InMemoryCache();
                const client = new ApolloClient({cache, uri:''})

                ReactDOM.render(
                  <ApolloClient client = {client}>
                    <App />
                  </ApolloClient>,
                  document.getElementById('root')
                );
