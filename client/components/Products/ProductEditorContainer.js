// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import EditProductComponent from './EditProductComponent';

export default createFragmentContainer(EditProductComponent, {
  product: graphql`
    fragment ProductEditorContainer_product on User {

      product(id: $productId) {
        id,
        name,
        title,
        category,
        short_description,
        full_description,
        price,
        updated_at
      }
    }`
});
