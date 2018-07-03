// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import MonthlyRevenueComponent from './MonthlyRevenueComponent';


export default createFragmentContainer(MonthlyRevenueComponent, {
  viewer: graphql`
        fragment MonthlyRevenueContainer_viewer on User {
            monthlyRevenue{
                total
            }
              
        }`
});
