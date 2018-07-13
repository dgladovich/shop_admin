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
      price
    }`
});
