// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import UserEditorComponent from './UserEditorComponent';

export default createFragmentContainer(UserEditorComponent, {
  viewer: graphql`
    fragment UserEditorContainer_viewer on User {
      product(id: $productId){
        id
        price
        name
        title
        category
        short_description
        full_description
        lang_key
      }
      categories(first: 20){
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
