// @flow/* eslint-disable global-require */import React from 'react';import PropTypes from 'prop-types';import Page from '../Page/PageComponent';import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';export default class ProductComponent extends React.Component {    static propTypes = {        viewer: PropTypes.object.isRequired,        relay: PropTypes.object.isRequired,    };    render() {        return (            <Page heading='Visits'></Page>        );    }}