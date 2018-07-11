// @flow
import {
  createFragmentContainer,
  graphql, 
} from 'react-relay/compat';
import CommentsTableComponent from './CommentsTableComponent';


export default createFragmentContainer(CommentsTableComponent, {
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
