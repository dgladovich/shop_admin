// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';

import CustomersContainer from './CustomersContainer';
import MonthlyRevenueContainer from './MonthlyRevenueContainer';
import OrdersCounterContainer from './OrdersCounterContainer';
import OrdersContainer from './OrdersContainer';
import ReviewsContainer from './ReviewsContainer';

export default class ProductPage extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        console.log(this.props)
        return (
            <div>
                <Grid>
                    <Cell col={6}>
                        <Grid>
                            <Cell col={6}>
                                <MonthlyRevenueContainer viewer={this.props.viewer}/>
                            </Cell>
                            <Cell col={6}>
                                <OrdersCounterContainer/>
                            </Cell>
                            <Cell col={12}>
                                <OrdersContainer/>
                            </Cell>
                        </Grid>
                    </Cell>
                    <Cell col={5}>
                        <Grid>
                            <Cell col={6}>
                                <ReviewsContainer/>
                            </Cell>
                            <Cell col={6}>
                                <CustomersContainer viewer={this.props.viewer}/>
                            </Cell>
                        </Grid>
                    </Cell>
                </Grid>
            </div>
        );
    }
}
