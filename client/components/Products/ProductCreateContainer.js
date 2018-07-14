// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import ProductCreateComponent from './ProductCreateComponent';


export default createFragmentContainer(ProductCreateComponent, {
  viewer: graphql`
    fragment ProductCreateContainer_viewer on User {
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
