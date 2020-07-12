import React from 'react';

import './App.css';
import DataProvider from './providers/DataProvider';
import GqlProvider from './providers/GqlProvider';
import List from './containers/List';

const App = () => (
  <GqlProvider>
    <DataProvider>
      <List />
    </DataProvider>
  </GqlProvider>
);

export default App;
