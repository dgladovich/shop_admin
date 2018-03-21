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
    offsetToCursor,
    cursorForObjectInConnection
} from 'graphql-relay';

import {
    User,
    Feature,
    Product,
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
            type: productConnection,
            description: 'Array of products',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Product.findAll(), args)
        },
        categories: {
            type: categoryConnection,
            description: 'Array of categories',
            args: connectionArgs,
            resolve: ()=>{return []}
        },
        visits: {
            type: visitConnection,
            description: 'Array of visits for preset time interval',
            args: connectionArgs,
            resolve: ()=>{return []}
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

const orderType = new GraphQLObjectType({
    name: 'Order',
    description: 'Order which in queue',
    fields: () => ({
        id: globalIdField('Order'),
        products: {
            type: productConnection,
            description: 'Products, which user ordered',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Product.findAll(), args)
        },
        user: {
            type: userType,
            description: 'Users\'s username'
        },
        website: {
            type: GraphQLString,
        },
        delivery_date: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString
        },
        delivery_service: {
            type: GraphQLString
        },
        payment: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        total_price: {
            type: GraphQLFloat
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }),
    interfaces: [nodeInterface]
});
const orderProductType = new GraphQLObjectType({
    name: 'OrderProducts',
    description: 'Order which in queue',
    fields: () => ({
        id: globalIdField('OrderProduct'),
        product_id: {
            type: GraphQLInt
        },
        product: {
            type: productType

        },
        order_id: {
            type: GraphQLInt
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
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

const categoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'Category of shop and his parent',
    fields: () => ({
        id: globalIdField('Category Id'),
        title: {
            type: GraphQLString,
            description: 'Title of category'
        },
        description: {
            type: GraphQLString,
            description: 'Description of the category'
        },
        view_title: {
            type: GraphQLString,
            description: 'Title for view element'
        },
        image: {
            type: GraphQLString,
            description: 'Image src for category'
        },
        parent: {
            type: GraphQLString,
            description: 'Id of parent category'
        },
        children: {
            type: GraphQLString,
            description: 'Subcategories for category'
        },
        createdAt: {
            type: GraphQLString,
            description: 'Date, when category created'
        },
        updatedAt: {
            type: GraphQLInt,
            description: 'Date, when category updated'
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

const visitType = new GraphQLObjectType({
    name: 'Visit',
    description: 'Visit object',
    fields: () => ({
        date: {
            type: GraphQLString,
            description: 'Date of calendar'
        },
        quantity: {
            type: GraphQLInt,
            description: 'Quantity of visits for this day'
        }
    }),
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

const {connectionType: categoryConnection, edgeType: categoryEdge} = connectionDefinitions({
    name: 'Category',
    nodeType: categoryType
});

const {connectionType: visitConnection, edgeType: visitEdge} = connectionDefinitions({
    name: 'Visit',
    nodeType: visitType
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
            resolve: async (obj) => {
                let products = await db.Product.findAll({raw: true});
                let productsObjects = products.map(product => new Product(product.id, product.name, product.price));
                //const cursorId = cursorForObjectInConnection(productsObjects, object);
                const cursorId = offsetToCursor(products.length);
                return {node: obj.dataValues, cursor: cursorId}
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: ({name, price}) => addProduct(name, price)
});
const updateOrderMutation = mutationWithClientMutationId({
    name: 'UpdateOrder',
    inputFields: {
        delivery_date: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLInt)},
        delivery_service: {type: new GraphQLNonNull(GraphQLString)},
        payment: {type: new GraphQLNonNull(GraphQLString)},
        status: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        productEdge: {
            type: productEdge,
            resolve: async (obj) => {
                let products = await db.Product.findAll({raw: true});
                let productsObjects = products.map(product => new Product(product.id, product.name, product.price));
                //const cursorId = cursorForObjectInConnection(productsObjects, object);
                const cursorId = offsetToCursor(products.length);
                return {node: obj.dataValues, cursor: cursorId}
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: ({name, price}) => addProduct(name, price)
});
const addCategoryMutation = mutationWithClientMutationId({
    name: 'AddCategory',
    inputFields: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        view_title: {type: new GraphQLNonNull(GraphQLInt)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        createdAt: {type: new GraphQLNonNull(GraphQLString)},
        parent: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        categoryEdge: {
            type: categoryEdge,
            resolve: async (obj) => {}
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: () => addCategory()
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
        addProduct: addProductMutation,
        addCategory: addCategoryMutation,
        updateOrder: updateOrderMutation
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
