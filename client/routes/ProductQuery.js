import Relay from 'react-relay/classic';

export default {
    product: Component => Relay.QL`
        query {
            product(id: $productId){
                 ${Component.getFragment('product')}
            }
        }
      `
};
