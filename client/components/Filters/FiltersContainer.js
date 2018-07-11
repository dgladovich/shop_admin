// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import FiltersTableComponent from './FiltersTableComponent';


export default createFragmentContainer(FiltersTableComponent, {
  viewer: graphql`
    fragment FiltersContainer_viewer on User {
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
