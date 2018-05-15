// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

export default class ProductComponent extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return <div>Order details</div>;
    }
}
