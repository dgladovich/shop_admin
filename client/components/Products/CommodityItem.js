// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/CommodityItem.scss';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';


export default class CommodityItem extends React.Component {

    render() {
        return (
            <Cell cel={3} shadow={2} className={styles.commodity}>
                <span>{this.props.name}</span>
                <p>Price<span>{this.props.price}</span></p>
            </Cell>
        );
    }
}