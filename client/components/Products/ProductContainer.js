// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import ProductComponent from './ProductComponent';


export default createFragmentContainer(ProductComponent, {
    products: graphql`
        fragment ProductContainer_products on ProductRoot {
            products{
                name,
                price
            }
        }`
});
