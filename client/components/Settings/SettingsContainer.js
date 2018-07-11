// @flow
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import SettingsComponent from './SettingsComponent';


export default createFragmentContainer(SettingsComponent, {
  viewer: graphql`
    fragment SettingsContainer_viewer on User {
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
