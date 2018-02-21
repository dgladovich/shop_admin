import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import ProductsQuery from './ProductsQuery';
import AppContainer from '../components/App/AppContainer';
import FeatureContainer from '../components/Feature/FeatureContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import ProductContainer from '../components/Products/ProductContainer';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={FeatureContainer} queries={ViewerQuery} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Route path='/products' component={ProductContainer} queries={ProductsQuery}/>
    <Redirect from='*' to='/' />
  </Route>
);

