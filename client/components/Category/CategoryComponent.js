// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button, FABButton, Icon} from 'react-mdl';
import styles from './styles/CategoriesPage.scss';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { Link } from 'react-router';

export default class Category extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Grid>
                <Cell col={3}>
                    <CategoryForm relay={this.props.relay} viewer={this.props.viewer}/>
                </Cell>
                <Cell col={9}>
                    <CategoryList relay={this.props.relay} viewer={this.props.viewer}/>
                </Cell>
            </Grid>
        );
    }
}
