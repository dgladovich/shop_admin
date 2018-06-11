import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import FeatureContainer from '../components/Feature/FeatureContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import ProductContainer from '../components/Products/ProductContainer';
import CategoryContainer from '../components/Category/CategoryContainer';
import OrderContainer from '../components/Order/OrderContainer';
import VisitContainer from '../components/Visit/VisitContainer';
import UserContainer from '../components/User/UserContainer';
import CategoryEditComponent from '../components/Category/CategoryEditContainer';
import EditProductContainer from "../components/Products/EditProductContainer";
import ProductQuery from './ProductQuery';
export default (
    <Route path='/' component={AppContainer} queries={ViewerQuery}>
        <IndexRoute component={FeatureContainer} queries={ViewerQuery}/>
        <Route path='/signup' component={SignupComponent}/>
        <Route path='/login' component={LoginComponent}/>
        <Route path='/products'>
                <IndexRoute component={ProductContainer} queries={ViewerQuery}/>
                <Route path=':productId' component={EditProductContainer} queries={ProductQuery}/>
        </Route>
        <Route path='/categories' component={CategoryContainer} queries={ViewerQuery}/>
        <Route path='/orders' component={OrderContainer} queries={ViewerQuery}/>
        <Route path='/visits' component={VisitContainer} queries={ViewerQuery}/>
        <Route path='/users' component={UserContainer} queries={ViewerQuery}/>

        <Redirect from='*' to='/'/>
    </Route>
);

