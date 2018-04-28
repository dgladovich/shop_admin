// @flow
/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button, Textfield} from 'react-mdl';

export default class UserComponent extends React.Component {
    constructor(props){
        super(props);
        let {user} = props;
        this.state = {
            name: user.name,
            age: user.age
        }
    }
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Cell col={12}>
                <h4>User block</h4>
                <Grid>
                    {console.log(this.state)}
                    <Cell col={3}>
                        <Textfield
                            label="Name..."
                            style={{width: '200px'}}
                            onChange={(e) => {
                                this.setState({name: e.target.value})
                            }}
                            value={this.state.name}
                        />
                    </Cell>
                    <Cell col={3}>
                        <Textfield
                            onChange={(e) => {
                                this.setState({age: e.target.value})
                            }}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Age..."
                            style={{width: '200px'}}
                            value={this.state.age}
                        />
                    </Cell>
                </Grid>
            </Cell>
        );
    }
}
