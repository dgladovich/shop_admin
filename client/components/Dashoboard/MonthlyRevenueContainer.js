// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import MonthlyRevenueComponent from './MonthlyRevenueComponent';


export default createFragmentContainer(MonthlyRevenueComponent, {
  viewer: graphql`
        fragment MonthlyReviewContainer_viewer on User {
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
            categories(first: 20) {
                edges{
                    node{
                        id
                        title
                        view_title
                        description
                        parent
                    }
                }
            }
        }`
});
