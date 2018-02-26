// @flow
import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation AddProductMutation($input: AddProductInput!) {
        addProduct(input: $input) {
            product{
                name,
                price
            }
            viewer {
                id
            }
        }
    }
`;

function getConfigs(viewerId) {
    return [{
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: viewerId,
        connectionName: 'products',
        rangeBehaviors: {
            '': 'append',
        },
    }];
}

function getOptimisticResponse(data, viewerId) {
    console.log('first row', data, viewerId)
    return {
        addProduct: {
            products: data,
            viewer: {
                id: viewerId
            }
        }
    };
}

function commit(
    environment: Environment,
    data: Object,
    viewerId: number
) {
    console.log('viewerId:', viewerId)
    commitMutation(
        environment,
        {
            mutation,
            variables: { input: data },
            optimisticResponse: getOptimisticResponse(data, viewerId),
            configs: getConfigs(viewerId),
        }
    );
}

export default { commit };
