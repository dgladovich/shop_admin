// @flow
import {graphql, commitMutation, Environment} from 'react-relay/compat';

const mutation = graphql`
  mutation DeleteCategoryMutation($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      categoryEdge {09
        node {
          id
        }
      }
      removedTagId
    }
  }
`;

function getConfigs(categoryId) {
    return [{
        type: 'RANGE_DELETE',
        parentName: 'viewer',
        parentID: categoryId,
        connectionName: 'categories',
        deletedIDFieldName: 'categoryEdge',
    }];
}

function getOptimisticResponse(data, viewerId) {
    return {
        deleteCategory: {
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
                categoryId: number) {
    commitMutation(
        environment,
        {
            mutation,
            optimisticResponse: getOptimisticResponse(data, categoryId),
            configs: getConfigs(categoryId),
        }
    );
}

export default { commit };
