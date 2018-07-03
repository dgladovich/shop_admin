// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import DashboardComponent from './DashboardComponent';
import CustomersContainer from './CustomersContainer';
import MonthlyRevenueContainer from './MonthlyRevenueContainer';
import OrdersContainer from './OrdersContainer';
import OrderCounterContainer from './OrdersCounterContainer';
import ReviewsContainer from './ReviewsContainer';


export default createFragmentContainer(DashboardComponent, {
    viewer: graphql`
        fragment DashboardContainer_viewer on User {            
            ...CustomersContainer_viewer
            ...MonthlyRevenueContainer_viewer     
            ...OrdersContainer_viewer
            ...ReviewsContainer_viewer                  
            ...OrderCounterContainer_viewer                  
            
        }`
});
