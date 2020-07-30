// (1) 2020, 7/30 create apollo server instance in index.js
// (2) wapper of App comopnent & ApolloProvider component

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
