// @flow
import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation UpdateUserMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
            userEdge {
                __typename
                node {
                    name
                    age
                }
            }
            viewer {
                id
            }
        }
    }
`;

function getConfigs(viewerId) {
    return [{
        type: 'FIELDS_CHANGE',
        fieldIDs: {
            orders: this.props.order_id,
        },
    }];
}

function getOptimisticResponse(data, viewerId) {
    return {
        updateOrder: {
            orderEdge: {
                node: data
            },
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
