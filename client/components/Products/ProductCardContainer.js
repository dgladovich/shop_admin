// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import ProductCardComponent from './ProductCardComponent';


export default createFragmentContainer(ProductCardComponent, {
  product: graphql`
    fragment ProductCardContainer_product on Product {
      id,
      name,
      price,
      title,
      category,
      status,
      short_description,
      full_description,
      updated_at,
      images(first: 10) {
        edges{
          node{
            id,
            title,
            src,
            main,
            updatedAt
          }
        }
      }
    }`
});
