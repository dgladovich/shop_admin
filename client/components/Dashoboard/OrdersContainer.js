// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import OrdersComponent from './OrdersComponent';


export default createFragmentContainer(OrdersComponent, {
  viewer: graphql`
      fragment OrdersContainer_viewer on User {
          orders(first: 20) {
              edges{
                  node{
                      address
                      delivery_service
                      payment
                      status
                      total_price
                      created_at
                      updated_at
                      price
                  }
              }
          }   
      }`
});
