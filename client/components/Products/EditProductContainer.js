// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import Product from './ProductComponent';


export default createFragmentContainer(Product, {
    viewer: graphql`
        fragment EditProductContainer_viewer on User {
            product{
                id
                price
                name
            }
        }`
});
