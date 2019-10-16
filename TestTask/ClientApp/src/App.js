import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import ItemsPage from "./components/items";
import Statistic from "./components/statistic"
export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    {/* <Route path='/counter' component={Counter} />
    <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> */}
    <Route path='/items' component={ItemsPage}/>
    <Route path="/statistic" component={Statistic}/>
  </Layout>
);
