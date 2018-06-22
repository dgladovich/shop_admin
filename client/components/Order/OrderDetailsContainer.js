// @flow
import {createRefetchContainer, graphql} from 'react-relay/compat';
import Order from './OrderDetails';


export default createRefetchContainer(Order, {
        viewer: graphql`
        fragment OrderDetailsContainer_viewer on User {
            id,
            order(id: $orderId){
                user{
                    edges{
                        node{
                            id
                            name
                        }
                    }
                }
                delivery_date
                delivery_service
                payment
                status
                total_price
                address
                
            }
          
        }`

    },
    graphql`
        query OrderDetailsContainerQuery($orderId: String) {
          viewer {
            order(id: $orderId){
                user{
                    edges{
                        node{
                            id
                            name
                        }
                    }
                }
                delivery_date
                delivery_service
                payment
                status
                total_price
                address
                
            }
          }
        }
    `
);
