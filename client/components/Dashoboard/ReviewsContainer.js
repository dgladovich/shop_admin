// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import ReviewsComponent from './ReviewsComponent';


export default createFragmentContainer(ReviewsComponent, {
  viewer: graphql`
        fragment ReviewsContainer_viewer on User {
            newOrdersCount{
                total
            }
        }`
});
