// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import Category from './CategoryEditComponent';

export default createFragmentContainer(Category, {
    viewer: graphql`
    fragment CategoryEditContainer_viewer on User {
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
