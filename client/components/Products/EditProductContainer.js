// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import EditProductComponent from './EditProductComponent';

export default createFragmentContainer(EditProductComponent, {
    viewer: graphql`
        fragment EditProductContainer_viewer on User {
            product(id: $prodiu){
                id
                price
                name
            }
        }`
});
