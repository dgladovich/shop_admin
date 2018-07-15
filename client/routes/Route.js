import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';

import ViewerQuery from './ViewerQuery';
import ProductQuery from './ProductQuery'

import AppContainer from '../components/App/AppContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';
import ProductContainer from '../components/Products/ProductContainer';
import CategoryContainer from '../components/Category/CategoryContainer';
import DashboardContainer from '../components/Dashoboard/DashboardContainer';
import OrderContainer from '../components/Order/OrderContainer';
import VisitContainer from '../components/Visit/VisitContainer';
import UserContainer from '../components/User/UserContainer';
import CommentsContainer from "../components/Comments/CommentsContainer";
import FiltersContainer from "../components/Filters/FiltersContainer";
import SettingsContainer from "../components/Settings/SettingsContainer";

import ProductEditorContainer from '../components/Products/ProductEditorContainer';
import CategoryEditorContainer from '../components/Category/CategoryEditorContainer';
import CommentEditorContainer from '../components/Comments/CommentEditorContainer';
import FilterEditorContainer from '../components/Filters/FilterEditorContainer';
import OrderEditorContainer from '../components/Order/OrderEditorContainer';
import UserEditorContainer from '../components/User/UserEditorContainer';

import ProductCreateContainer from '../components/Products/ProductCreateContainer';
import CategoryCreateContainer from '../components/Category/CategoryCreateContainer';
import FilterCreateContainer from '../components/Filters/FilterCreateContainer';
import UserCreateContainer from '../components/User/UserCreateContainer';

import OrderDetailsContainer from '../components/Order/OrderDetailsContainer';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={DashboardContainer} queries={ViewerQuery}/>
    <Route path='/signup' component={SignupComponent}/>
    <Route path='/login' component={LoginComponent}/>

    <Route path='/products'>
      <IndexRoute component={ProductContainer} queries={ViewerQuery}/>
      <Route path='create'  component={ProductCreateContainer} queries={ViewerQuery}/>
      <Route path=':productId'  component={ProductEditorContainer} queries={ProductQuery}/>
    </Route>

    <Route path='/categories' >
      <IndexRoute component={CategoryContainer}  queries={ViewerQuery}/>
      <Route path=':categoryId'  component={CategoryEditorContainer} queries={ViewerQuery}/>
      <Route path='/create'  component={CategoryCreateContainer} queries={ViewerQuery}/>

    </Route>

    <Route path='/orders'>
      <IndexRoute component={OrderContainer} queries={ViewerQuery}/>
      <Route path=':categoryId' component={OrderDetailsContainer} queries={ViewerQuery}/>
      <Route path=':categoryId/edit' component={OrderEditorContainer} queries={ViewerQuery}/>
    </Route>

    <Route path='/visits'>
      <IndexRoute component={VisitContainer} queries={ViewerQuery}/>
    </Route>

    <Route path='/users'>
      <IndexRoute component={UserContainer} queries={ViewerQuery}/>
      <Route path=':categoryId' component={UserEditorContainer} queries={ViewerQuery}/>
      <Route path='/create' component={UserCreateContainer} queries={ViewerQuery}/>

    </Route>

    <Route path='/comments'>
      <IndexRoute component={CommentsContainer} queries={ViewerQuery}/>
      <Route path=':categoryId' component={CommentEditorContainer} queries={ViewerQuery}/>
    </Route>

    <Route path='/filters'>
      <IndexRoute component={FiltersContainer} queries={ViewerQuery}/>
      <Route path=':categoryId' component={FilterEditorContainer} queries={ViewerQuery}/>
      <Route path='/create' component={FilterCreateContainer} queries={ViewerQuery}/>

    </Route>

    <Route path='/settings'>
      <IndexRoute component={SettingsContainer} queries={ViewerQuery}/>
    </Route>

    {/*<Redirect from='*' to='/'/>*/}
  </Route>
);

