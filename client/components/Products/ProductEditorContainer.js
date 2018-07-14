// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import EditProductComponent from './EditProductComponent';

export default createFragmentContainer(EditProductComponent, {
  viewer: graphql`
    fragment ProductEditorContainer_viewer on User {

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
