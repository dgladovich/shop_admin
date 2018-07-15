// @flow
import {
    createPaginationContainer,
    graphql,
} from 'react-relay/compat';
import ProductsTableComponent from './ProductsTableComponent';
import ProductCardContainer from './ProductCardContainer';


export default createPaginationContainer(ProductsTableComponent, {
    viewer: graphql`
      fragment ProductContainer_viewer on User
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 20}
        cursor: {type: "String"}

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
      console.log('any of this fucking functions calling 1', props)
      return props.viewer.products;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    getFragmentVariables(prevVars, totalCount) {
      console.log('any of this fucking functions calling 2', prevVars, totalCount)
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      console.log('any of this fucking functions calling 3', props, count, cursor, fragmentVariables)
      return {
        count,
        cursor,
        // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
        userID: fragmentVariables.userID,
      };
    },
    viewer: graphql`      
      query ProductContainerQuery(
        $count: Int!
        $cursor: String
        $userID: ID!
      ) {
        viewer: node(id: $userID) {
          ...ProductContainer_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  });
