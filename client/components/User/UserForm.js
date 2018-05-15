// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/UserForm.scss';

import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button, Textfield, Checkbox} from 'react-mdl';

export default class UserComponent extends React.Component {

    render() {
        return (
            <Cell col={12}>
                <h4>Create user</h4>
                <Textfield
                    label="Name..."
                    onChange={(e) => {
                        this.setState({name: e.target.value})
                    }}
                />
                <Textfield
                    onChange={(e) => {
                        this.setState({age: e.target.value})
                    }}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    label="Age..."
                />
                <Textfield
                    onChange={(e) => {
                        this.setState({email: e.target.value})
                    }}
                    label="Email..."
                />
                <Checkbox label="Active" />

                <Button raised accent className={styles.buttonSubmit}>Create user</Button>
            </Cell>
        );
    }
}
