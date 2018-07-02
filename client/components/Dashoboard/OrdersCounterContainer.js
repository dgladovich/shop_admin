// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import OrdersCounterComponent from './OrdersCounterComponent';


export default createFragmentContainer(OrdersCounterComponent, {
    total: graphql`
        fragment OrdersCounterContainer_total on OrderConnection {
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
