// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddCategory from './AddCategoryComponent';
export default class Category extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Page heading='Categories'>
            <AddCategory relay={this.props.relay} viewer={this.props.viewer} />
        </Page>
      </div>
    );
  }
}
