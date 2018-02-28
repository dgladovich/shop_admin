// @flow
/* eslint-disable no-unused-vars, no-use-before-define */
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';


import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    connectionFromPromisedArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    cursorForObjectInConnection
} from 'graphql-relay';

import {
    User,
    Feature,
    userLoader,
    featureLoader,
    productLoader,
    getFeatures,
    getProducts,
    addFeature,
    addProduct,
} from './database';
import {resolver} from 'graphql-sequelize';
import db from '../models';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        switch (type) {
            case 'User':
                return userLoader.load(id);
                break;
            case 'Feature':
                return featureLoader.load(id);
                break;
            case 'Product':
                return productLoader.load(id);
            default:
                return null;
        }
    },
    (obj) => {
        if (obj instanceof User) {
            return userType;
        } else if (obj instanceof Feature) {
            return featureType;
        } else if (obj instanceof Product) {
            return productType;
        }
        return null;
    }
);

/**
 * Define your own types here
 */

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'A person who uses our app',
    fields: () => ({
        id: globalIdField('User'),
        features: {
            type: featureConnection,
            description: 'Features that I have',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(featureLoader.loadMany(source.features), args)
        },
        products: {
            type: new GraphQLList(productType),
            description: 'Products that I have',
            resolve: resolver(db.Product)
        },
        mproducts: {
            type: productConnection,
            description: 'New modified product shit',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Product.findAll(), args)
        },
        username: {
            type: GraphQLString,
            description: 'Users\'s username'
        },
        website: {
            type: GraphQLString,
        }
    }),
    interfaces: [nodeInterface]
});


const featureType = new GraphQLObjectType({
    name: 'Feature',
    description: 'Feature integrated in our starter kit',
    fields: () => ({
        id: globalIdField('Feature'),
        name: {
            type: GraphQLString,
            description: 'Name of the feature'
        },
        description: {
            type: GraphQLString,
            description: 'Description of the feature'
        },
        url: {
            type: GraphQLString,
            description: 'Url of the feature'
        },
    }),
});
const productType = new GraphQLObjectType({
    name: 'Product',
    description: 'Product ',
    fields: () => ({
        id: globalIdField('Product'),
        name: {
            type: GraphQLString,
            description: 'Name of the product'
        },
        price: {
            type: GraphQLInt,
            description: 'Description of the pruduct'
        },
        created_at: {
            type: GraphQLString,
            description: 'Date where product created'
        },
        updadet_at: {
            type: GraphQLString,
            description: 'Date where product updated'
        }
    }),
});

const productRoot = new GraphQLObjectType({
    name: 'ProductRoot',
    description: 'Root of products array',
    fields: () => ({
        id: globalIdField('Products'),
        products: {
            type: new GraphQLList(productType),
            description: 'Products that I have',
            resolve: resolver(db.Product, {list: true})
        },
    })
});

/**
 * Define your own connection types here
 */
const {connectionType: featureConnection, edgeType: featureEdge} = connectionDefinitions({
    name: 'Feature',
    nodeType: featureType
});

const {connectionType: productConnection, edgeType: productEdge} = connectionDefinitions({
    name: 'Product',
    nodeType: productType
});

/**
 * Create feature example
 */

const addFeatureMutation = mutationWithClientMutationId({
    name: 'AddFeature',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        url: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        featureEdge: {
            type: featureEdge,
            resolve: (obj) => {
                const cursorId = cursorForObjectInConnection(getFeatures(), obj);
                return {node: obj, cursor: cursorId};
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: ({name, description, url}) => addFeature(name, description, url)
});
const addProductMutation = mutationWithClientMutationId({
    name: 'AddProduct',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLInt)},
        created_at: {type: new GraphQLNonNull(GraphQLString)},
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        productEdge: {
            type: productEdge,
            resolve: (obj) => {
                const cursor = cursorForObjectInConnection(getFeatures(), obj);
                console.log(cursor)
                return {node: obj.dataValues, cursor: cursor}
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: ({name, price}) => addProduct(name, price)
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        // Add your own root fields here
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        },
        productRoot: {
            type: productRoot,
            resolve: resolver(db.Product)
        }
    })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addFeature: addFeatureMutation,
        addProduct: addProductMutation
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
