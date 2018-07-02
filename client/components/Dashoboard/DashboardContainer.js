// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import DashboardComponent from './DashboardComponent';
import CustomersContainer from './CustomersContainer';
import MonthlyRevenue from './MonthlyRevenueContainer';
import OrdersContainer from './OrdersContainer';
import OrderCounterContainer from './OrdersCounterContainer';
import ReviewsContainer from './ReviewsContainer';


export default createFragmentContainer(DashboardComponent, {
    viewer: graphql`
        fragment DashboardContainer_viewer on User {            
            ...CustomersContainer_viewer
            
            orders(first: 20) {
                ...OrdersContainer_orders                  
            }
        }`
});
