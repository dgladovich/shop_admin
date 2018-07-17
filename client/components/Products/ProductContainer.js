// @flow
import {
    createRefetchContainer,
    graphql,
} from 'react-relay/compat';
import ProductsTableComponent from './ProductsTableComponent';
import ProductCardContainer from './ProductCardContainer';


const ProductContainer = createRefetchContainer(
    ProductsTableComponent, {

        viewer: graphql`
              fragment ProductContainer_viewer on User 
              @argumentDefinitions(
                count: {type: "Int", defaultValue: 20}        
              ) {
                products( first: $count, after: $cursor) {
                  pageInfo{
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                  }
                  edges {
                    cursor
                    node {
                      id
                      ...ProductCardContainer_product
                    }
                  }
                }
              }
            `
    }
    ,
    graphql`
          query ProductContainerQuery( $count: Int! $cursor: String) {
            viewer{
                ...ProductContainer_viewer @arguments(first: $count, after: $cursor)
            }
          }
        `
);


export default ProductContainer;
