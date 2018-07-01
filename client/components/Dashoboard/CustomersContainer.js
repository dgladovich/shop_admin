// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import CustomersComponent from './CustomersComponent';


export default createFragmentContainer(CustomersComponent, {
  categories: graphql`
        fragment CustomersContainer_categories on CategoryConnection {
                edges{
                    node{
                        id
                        title
                        view_title
                        description
                        parent
                    }
                }
        }`
});
