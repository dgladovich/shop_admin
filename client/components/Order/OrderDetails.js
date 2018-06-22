// @flow
/* eslint-disable global-require */
import React from 'react';

export default class OrderDetails extends React.Component {
    componentDidMount(){
        console.log(this.props)
        let order = {id: this.props.orderId};
        this.props.relay.refetch(order);
    }

    render() {
        console.log(this.props)
        return <div>Order details</div>;
    }
}
