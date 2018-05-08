// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/ProductPage.scss';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import ProductForm from './ProductForm'; 
import ProductList from './ProductList';


export default class ProductPage extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Grid>
                <Cell col={4}>
                    <ProductForm relay={this.props.relay} viewer={this.props.viewer}/>
                </Cell>
                <Cell col={8}>
                    <ProductList relay={this.props.relay} viewer={this.props.viewer}/>
                </Cell>
            </Grid>
        );
    }
}
