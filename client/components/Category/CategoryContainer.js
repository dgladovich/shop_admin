// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import CategoryTableComponent from './CategoryTableComponent';

export default createFragmentContainer(CategoryTableComponent, {
  viewer: graphql`
    fragment CategoryContainer_viewer on User {
      id,
      categories(first: 20) {
        edges {
          node {
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
