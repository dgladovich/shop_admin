// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';

import OrdersTableComponent from "./OrdersTableComponent";


export default createFragmentContainer(OrdersTableComponent, {
    viewer: graphql`
        fragment OrderContainer_viewer on User {
            id,
            orders(first: 20) {
                edges{
                    node{
                        user {
                            edges{
                                node{
                                    id
                                    name
                                }
                            }
                        }
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
