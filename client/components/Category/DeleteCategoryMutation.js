// @flow
import {graphql, commitMutation, Environment} from 'react-relay/compat';

const mutation = graphql`
  mutation DeleteCategoryMutation($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      categoryEdge {
        node {
            title
            view_title
            image
            description
        }
      }
    }
  }
`;

function getConfigs(viewerId) {
    return [{
        type: 'RANGE_DELETE',
        parentName: 'viewer',
        parentID: viewerId,
        connectionName: 'categories',
        edgeName: 'categoryEdge',
        rangeBehaviors: {
            '': 'append',
        },
    }];
}

function getOptimisticResponse(data, viewerId) {
    return {
        addCategory: {
            categoryEdge: {
                node: data,
            },
            viewer: {
                id: viewerId
            }
        }
    };
}

function commit(environment: Environment,
                data: Object,
                viewerId: number) {
    commitMutation(
        environment,
        {
            mutation,
            variables: {input: data},
            optimisticResponse: getOptimisticResponse(data, viewerId),
            configs: getConfigs(viewerId),
        }
    );
}

export default {commit};
