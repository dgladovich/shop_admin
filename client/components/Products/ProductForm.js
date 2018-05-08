// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Button, Textfield} from 'react-mdl';
import {MDLSelectField} from 'react-mdl-select';
import AddProductMutation from './AddProductMutation';
import styles from 'style/ProductForm.scss';


export default class AddProduct extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    state: {
        name: '',
        price: 0,
    };

    addProduct = () => {

        let value = Object.assign(this.state, {
            created_at: '2018-02-12',
            updated_at: '2018-02-12',
        });
        AddProductMutation.commit(
            this.props.relay.environment,
            value,
            this.props.viewer.id,
        );
    };

    render() {
        return (
            <Cell col={12}>
                <Textfield
                    onChange={(e) => {
                        this.setState({name: e.target.value});
                    }}
                    label="Product name..."
                />
                <Textfield
                    onChange={(e) => {
                        this.setState({price: +e.target.value})
                    }}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    label="Number..."
                />
                <MDLSelectField
                    label="Category"
                    value={{name: 'Main shit', id: 34}}
                    autocomplete
                    floatingLabel
                    onChange={() => {
                    }}
                    items={[{name: 'shit one', id: 123}, {name: 'shit two', id: 12}]}
                    keyField="id"
                    valueField="name"
                />
                <Textfield
                    onChange={() => {
                    }}
                    label="Short description..."
                    rows={3}
                    style={{width: '200px'}}
                />
                <Textfield
                    onChange={() => {
                    }}
                    label="Complete description..."
                    rows={6}
                    style={{width: '200px'}}
                />
                <Button raised accent onClick={this.addProduct.bind(this)}>Add product</Button>
            </Cell>


        );
    }
}
