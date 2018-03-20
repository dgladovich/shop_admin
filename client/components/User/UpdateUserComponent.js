// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Button, Textfield } from 'react-mdl';
import Page from '../Page/PageComponent';
import UpdateUserMutation from './UpdateUserMutation';


export default class UpdateUser extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    state: {
        name: '',
        price: 0,
    }

    addProduct = () => {
        AddProductMutation.commit(
            this.props.relay.environment,
            value,
            this.props.viewer.id,
        );
    }

    render() {
        return (
            <Page heading='Add a Product'>
                <Grid>
                    <Cell col={9}>
                        <Textfield
                            onChange={(e) => {
                                this.setState({ name: e.target.value});
                            }}
                            label="Product name..."
                            style={{width: '200px'}}
                        />
                        <Textfield
                            onChange={(e) => {
                                this.setState({ price: +e.target.value })
                            }}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Number..."
                            style={{width: '200px'}}
                        />
                    </Cell>
                    <Cell col={3} style={{ textAlign: 'center' }}>
                        <Button raised accent onClick={this.addProduct.bind(this)}>Add product</Button>
                    </Cell>
                </Grid>
            </Page>
        );
    }
}
