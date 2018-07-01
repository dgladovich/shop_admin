// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import DashboardComponent from './DashboardComponent';
import OrdersContainer from './OrdersContainer';
import CustomersContainer from './CustomersContainer';

export default createFragmentContainer(DashboardComponent, {
  viewer: graphql`
        fragment DashboardContainer_viewer on User {
            id,
            products(first: 20) {
                edges{
                    node{
                        id,
                        name,
                        price
                    }
                }
            }
            
            ...CustomersContainer_viewer
            
            orders(first: 20) {
                ...OrdersContainer_orders                  
            }
        }`
});
