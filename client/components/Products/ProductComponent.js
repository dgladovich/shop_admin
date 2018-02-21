// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';

export default class ProductComponent extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Its awesome!</h2>


            </div>
        );
    }
}
