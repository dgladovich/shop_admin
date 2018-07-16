// @flow
import {
    createPaginationContainer,
    graphql,
} from 'react-relay/compat';
import ProductsTableComponent from './ProductsTableComponent';
import ProductCardContainer from './ProductCardContainer';


const ProductContainer = createPaginationContainer(
    ProductsTableComponent,
    {
        viewer: graphql`
      fragment ProductContainer_viewer on User 
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 20}
        cursor: {type: "String"}
        userID: {type: "ID"}

      ) {
        products(
          first: $count
          after: $cursor
        ) @connection(key: "ProductContainer_products") {
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
    `,
    },
    {
        direction: 'forward',

        getConnectionFromProps(props) {
            //console.log('1', props);
            return props.viewer.products;
        },
        // This is also the default implementation of `getFragmentVariables` if it isn't provided.
        getVariables(props, {count, cursor}, fragmentVariables) {
            console.log('2', props, count, cursor, fragmentVariables);
            let propsToReturn = {
                count,
                cursor,
                // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
                userID: props.viewer.__dataID__,
            };
            console.log(propsToReturn)
            return {
                count,
                cursor,
                // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
                userID: props.viewer.__dataID__,
            };
        },
        getFragmentVariables(prevVars, totalCount) {
            console.log('3', prevVars, totalCount);
            return {
                ...prevVars,
                count: totalCount,
            };
        },
        query: graphql`
          query ProductContainerQuery( $count: Int! $cursor: String) {
            viewer{
              ...ProductContainer_viewer @arguments(count: $count, cursor: $cursor)
            }
          }
        `
    });


export default ProductContainer;
