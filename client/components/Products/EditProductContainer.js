// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import EditProductComponent from './EditProductComponent';

export default createFragmentContainer(EditProductComponent, {
    product: graphql`
        fragment EditProductContainer_product on Product {
            id
            price
            name
        }`
});
