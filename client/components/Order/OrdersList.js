// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemAction, ListItemContent, Icon} from 'react-mdl';
import OrderItem from './OrderItem';

export default class OrderList extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {

        return (
            <List>
                {this.props.viewer.orders.edges.map((edge) => {
                    return <OrderItem
                        key={edge.node.__dataID__}
                        relay={this.props.relay}
                        node={edge.node}
                    />
                })}
            </List>
        );
    }
}
