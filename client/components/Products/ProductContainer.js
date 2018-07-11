// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import ProductsTableComponent from './ProductsTableComponent';


export default createFragmentContainer(ProductsTableComponent, {
    viewer: graphql`
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
            categories(first: 20) {
                edges{
                    node{
                        id
                        title
                        view_title
                        description
                        parent
                    }
                }
            }
        }`
});
