// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { MDLSelectField } from 'react-mdl-select';
import styles from './style/CategoriesSelect.scss';


export default class CategoriesSelect extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    render() {
        console.log(this.props.viewer, this.props.relay);
        return (
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
        );
    }
}
