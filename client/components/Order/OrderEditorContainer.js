// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import OrderEditorComponent from './OrderEditorComponent';


export default createFragmentContainer(OrderEditorComponent, {
  viewer: graphql`
    fragment OrderEditorContainer_viewer on User {
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
