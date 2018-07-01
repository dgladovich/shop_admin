// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';



export default class ProductPage extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <h3>Reviews component</h3>
      </div>
    );
  }
}
