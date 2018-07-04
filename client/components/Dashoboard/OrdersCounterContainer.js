// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import OrdersCounterComponent from './OrdersCounterComponent';


export default createFragmentContainer(OrdersCounterComponent, {
    viewer: graphql`
        fragment OrdersCounterContainer_viewer on User {
            newOrdersCount{
                total
            }
        }`
});
