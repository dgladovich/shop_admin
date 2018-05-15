// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page/PageComponent';
import OrderItemComponent from './OrderItemComponent';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import UpdateOrder from './UpdateOrderComponent'

export default class OrderItemComponent extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div></div>
        );
    }
}
