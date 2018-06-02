// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import CommodityItem from './CommodityItem';
import ViewerQuery from "../../routes/ViewerQuery";
import ProductContainer from "./ProductContainer";



export default class ProductComponent extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Grid>
                {
                    this.props.viewer.products.edges.map((product, key) => {
                        return (
                            <CommodityItem
                                key={product.node.id}
                                name={product.node.name}
                                price={product.node.price}
                                productId={product.node.id}
                                relay={this.props.relay}
                                viewer={this.props.viewer}
                            />
                        )
                    })}

            </Grid>
        );
    }
}
