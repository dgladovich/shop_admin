import Relay from 'react-relay/classic';

export default {
  product: Component => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('product')}
      }
    }
  `
};
