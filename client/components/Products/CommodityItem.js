// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/CommodityItem.scss';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button, IconButton} from 'react-mdl';


export default class CommodityItem extends React.Component {

    render() {
        return (
            <Cell cel={3} shadow={2} className={styles.commodity}>
                <IconButton className={styles.editButton} name="build" />
                <IconButton className={styles.deleteButton} name="delete_outline" />
                <span>{this.props.name}</span>
                <p>Price<span>{this.props.price}</span></p>
            </Cell>
        );
    }
}