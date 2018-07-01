// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import OrdersComponent from './OrdersComponent';


export default createFragmentContainer(OrdersComponent, {
  orders: graphql`
        fragment OrdersContainer_orders on OrderConnection {
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
        }`
});
