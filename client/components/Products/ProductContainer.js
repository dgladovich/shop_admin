// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import ProductsTableComponent from './ProductsTableComponent';
import ProductCardContainer from './ProductCardContainer';


export default createFragmentContainer(ProductsTableComponent, {
    viewer: graphql`
        fragment ProductContainer_viewer on User {
            id,
            products(first: 20) {
                edges{
                    node{
                        ...ProductCardContainer_product
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
