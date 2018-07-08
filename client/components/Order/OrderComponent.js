// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import OrdersList from './OrdersList';
import OrderDetails from './OrderDetailsContainer';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import UpdateOrder from './UpdateOrderComponent'
import OrdersListNew from './OrdersListNew';

export default class OrderComponent extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        let firstOrder = this.props.viewer.orders.edges[0].node.__dataID__;
/*        return (
            <Grid>
                <Cell col={3}>
                    <OrdersList relay={this.props.relay} viewer={this.props.viewer}/>
                </Cell>
                <Cell col={9}>
                    <OrderDetails orderId={firstOrder}/>
                </Cell>
            </Grid>
        );     */
        return (
            <OrdersListNew/>
        );
    }
}
