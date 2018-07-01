// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import ReviewsComponent from './ReviewsComponent';


export default createFragmentContainer(ReviewsComponent, {
  viewer: graphql`
        fragment ReviewsContainer_viewer on User {
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
