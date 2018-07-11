// @flow
import {
    createFragmentContainer,
    graphql,
} from 'react-relay/compat';
import UsersTableComponent from './UsersTableComponent';


export default createFragmentContainer(UsersTableComponent, {
    viewer: graphql`
        fragment UserContainer_viewer on User {
            id,
            users(first: 20) {
                edges{
                    node{
                        name,
                        age,
                        email,
                    }
                }
            }
        }`
});
