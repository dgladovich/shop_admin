// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import CategoryEditorComponent from './CategoryEditorComponent';


export default createFragmentContainer(CategoryEditorComponent, {
  viewer: graphql`
    fragment CommentsContainer_viewer on User {
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
