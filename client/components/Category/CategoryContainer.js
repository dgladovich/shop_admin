// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import Category from './CategoryComponent';


export default createFragmentContainer(Category, {
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
