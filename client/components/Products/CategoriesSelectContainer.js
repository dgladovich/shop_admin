// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';

import CategoriesSelect from './CategoriesSelect';


export default createFragmentContainer(CategoriesSelect, {
    viewer: graphql`
        fragment CategoriesSelectContainer_viewer on User {
            id,
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
