// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';



export default class ReviewsComponent extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Pending Reviews</h3>
      </div>
    );
  }
}
