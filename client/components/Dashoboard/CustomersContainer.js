// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import CustomersComponent from './CustomersComponent';


export default createFragmentContainer(CustomersComponent, {
  viewer: graphql`
        fragment CustomersContainer_viewer on User {
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
