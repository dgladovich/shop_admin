// @flowimport {    createFragmentContainer,    graphql,} from 'react-relay/compat';import Product from './VisitComponent';export default createFragmentContainer(Product, {    viewer: graphql`        fragment VisitContainer_viewer on User {            id,            visits(first: 20) {                edges{                    node{                        id,                        date,                        quantity                    }                }            }        }`});