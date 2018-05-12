// @flow
import React from 'react';
import Relay from 'react-relay'
import PropTypes from 'prop-types';
import {MDLSelectField} from 'react-mdl-select';
import styles from './styles/CategorySelectComponent.scss';
import { graphql} from 'react-relay';

class CategoriesSelect extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };

    prepareCategories() {
/*        return this.props.viewer.categories.edges.map(category => {
            let cat = category.node;
            return {
                id: cat.id,
                name: cat.title
            }
        });*/
    }

    render() {
        let categories = this.prepareCategories();
        return (<div></div>);
    }
}

export default  Relay.createFragmentContainer(
    CategoriesSelect,
    {
        fragments: {
            viewer: () => Relay.QL`
                fragment ProductContainer_viewer on User {
                    id,
                    products(first: 20) {
                        edges{
                            node{
                                id,
                                name,
                                price
                            }
                        }
                    }
                }
      `,
        },
    },
)

/*

< MDLSelectField
    label = "Category"
    value = {categories[0]}
    autocomplete
    floatingLabel
    onChange = {this.props.onChange
    }
    items = {categories}
    keyField = "id"
    valueField = "name"
            / >*/
