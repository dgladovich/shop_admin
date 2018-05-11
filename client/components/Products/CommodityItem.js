// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/CommodityItem.scss';
import CommodityUpdateDialog from './CommodityUpdateDialog';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button, IconButton} from 'react-mdl';


export default class CommodityItem extends React.Component {
    state = {
        isOpenDialog: false
    };
    openEditWindow = ()=>{
        this.setState({ isOpenDialog: true });
    };
    onCloseEditor = ()=>{
      this.setState({ isOpenDialog: false });
    };
    deleteCommodity = ()=>{

    };
    render() {
        return (
            <Cell cel={3} shadow={2} className={styles.commodity}>
                <div className={styles.controllButtons}>
                    <IconButton onClick={this.deleteCommodity.bind(this)} className={styles.deleteButton} name="delete_outline" />
                    <IconButton onClick={this.openEditWindow.bind(this)} className={styles.editButton} name="build" />
                </div>
                <span>{this.props.name}</span>
                <p>Price<span>{this.props.price}</span></p>
                <CommodityUpdateDialog isOpen={this.state.isOpenDialog} onCloseEditor={this.onCloseEditor.bind(this)}/>
            </Cell>
        );
    }
}