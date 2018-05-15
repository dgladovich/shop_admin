// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {MDLSelectField} from 'react-mdl-select';
import styles from './styles/CategorySelectComponent.scss';

export default class CategoriesSelect extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    prepareCategories() {
        return this.props.viewer.categories.edges.map(category => {
            let cat = category.node;
            return {
                id: cat.id,
                name: cat.title
            }
        });
    }

    render() {
        let categories = this.prepareCategories();
        return (
            < MDLSelectField
                label="Category"
                value={categories[0]}
                autocomplete
                floatingLabel
                onChange={this.props.onChange.bind(this)}
                items={categories}
                keyField="id"
                valueField="name"
            />
        );
    }
}