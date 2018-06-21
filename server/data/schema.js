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
    GraphQLString,
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
    Category,
    userLoader,
    featureLoader,
    productLoader,
    getFeatures,
    getProducts,
    addFeature,
    addProduct,
    addCategory,
    deleteProduct
} from './database';
import {resolver} from 'graphql-sequelize';
import db from '../models';
import moment from 'moment';

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
            /*            case 'User':
                            return userLoader.load(id);
                            break;
                        case 'Feature':
                            return featureLoader.load(id);
                            break;
                        case 'Product':
                            return productLoader.load(id);*/
            default:
                return null;
        }
    },
    (obj) => {
        /*        if (obj instanceof User) {
                    return userType;
                } else if (obj instanceof Feature) {
                    return featureType;
                } else if (obj instanceof Product) {
                    return productType;
                }*/
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
        product: {
            type: productType,
            description: 'ProductType',
            args: {
                id: {type: GraphQLString}
            },
            resolve: async function (source, args) {
                let {id} = fromGlobalId(args.id);
                let shit = await db.Product.find({where: {id: +id}, raw: true});
                return shit;
            }
        },
        products: {
            type: productConnection,
            description: 'Array of products',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Product.findAll(), args)
        },
        users: {
            type: usersConnection,
            description: 'List of users',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.User.findAll(), args)
        },
        categories: {
            type: categoryConnection,
            description: 'Array of categories',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Category.findAll(), args)
        },
        orders: {
            type: orderConnection,
            description: 'Array of orders wich',
            args: connectionArgs,
            resolve: (source, args) => {
                return connectionFromPromisedArray(db.Order.findAll({
                    include: [{
                        model: db.ProductOrder,
                        as: 'products',
                        include: [{model: db.Product, as: 'productObject', required: false}]
                    }]
                }), args)
            }
        },
        visits: {
            type: visitConnection,
            description: 'Array of visits for preset time interval',
            args: connectionArgs,
            resolve: (source, args) => connectionFromPromisedArray(db.Visit.findAll({where: {created_at: {[db.Sequelize.Op.between]: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]}}}), args)
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

const usersType = new GraphQLObjectType({
    name: 'Users',
    description: 'Users which will be updated with admin',
    fields: () => ({
        id: globalIdField('Users'),
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
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
            type: orderProductConnection,
            description: 'Products, which user ordered',
            args: connectionArgs,
            resolve: (source, args) => connectionFromArray(source.dataValues.products, args)

        },
        user: {
            type: userConnection,
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
        price: {
            type: GraphQLFloat
        },
        created_at: {
            type: GraphQLString
        },
        updated_at: {
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
            type: productType,
            description: 'product object in db',
            args: connectionArgs,
            resolve: (source, args) => {
                return source.dataValues.productObject.dataValues
            }

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
            type: GraphQLInt,
            description: 'Id of parent category'
        },
        children: {
            type: GraphQLString,
            description: 'Subcategories for category'
        },
        lang_key: {
            type: GraphQLString,
            description: 'Subcategories for category'
        },
        createdAt: {
            type: GraphQLString,
            description: 'Date, when category created'
        },
        updatedAt: {
            type: GraphQLString,
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
        title: {
            type: GraphQLString,
            description: 'Description of the pruduct'
        },
        category: {
            type: GraphQLString,
            description: 'Description of the pruduct'
        },
        short_description: {
            type: GraphQLString,
            description: 'Description of the pruduct'
        },
        full_description: {
            type: GraphQLString,
            description: 'Description of the pruduct'
        },
        lang_key: {
            type: GraphQLString,
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
        id: globalIdField('Visit'),
        created_at: {
            type: GraphQLString,
            description: 'Date of calendar'
        },
        user_id: {
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

const {connectionType: usersConnection, edgeType: usersEdge} = connectionDefinitions({
    name: 'Users',
    nodeType: usersType
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

const {connectionType: orderConnection, edgeType: orderEdge} = connectionDefinitions({
    name: 'Order',
    nodeType: orderType
});
const {connectionType: orderProductConnection, edgeType: orderProductEdge} = connectionDefinitions({
    name: 'OrderProduct',
    nodeType: orderProductType
});

const {connectionType: userConnection, edgeType: userEdge} = connectionDefinitions({
    name: 'User',
    nodeType: usersType
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

const addCategoryMutation = mutationWithClientMutationId({
    name: 'AddCategory',
    inputFields: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        view_title: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: GraphQLString},
        description: {type: new GraphQLNonNull(GraphQLString)},
        parent: {type: GraphQLInt},
    },

    outputFields: {
        categoryEdge: {
            type: categoryEdge,
            resolve: async (obj) => {
                let categories = await db.Category.findAll({raw: true});
                let categoryObjects = categories.map(category => new Category(category.id, category.name, category.price));
                const cursorId = offsetToCursor(categories.length);
                return {node: obj.dataValues, cursor: cursorId}
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: (categoyData) => addCategory(categoyData)

});

const updateProductMutation = mutationWithClientMutationId({
    name: 'UpdateProduct',
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

const deleteProductMutation = mutationWithClientMutationId({
    name: 'DeleteProduct',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        deletedProductId: {
            type:  new GraphQLNonNull(GraphQLString),
            resolve: async (obj) => {
                let deletedId = obj.id;
                return deletedId;
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: async ({id}) => {
        const productId = fromGlobalId(id).id;
        const shit = await deleteProduct(productId);
        return {id: id};
    }
});
const deleteCategoryMutation = mutationWithClientMutationId({
    name: 'DeleteCategory',
    inputFields: {
        productId: {type: new GraphQLNonNull(GraphQLString)},
    },

    outputFields: {
        categoryEdge: {
            type: categoryEdge,
            resolve: async (obj) => {
                let products = await db.Category.findAll({raw: true});
                let productsObjects = products.map(product => new Product(product.id, product.name, product.price));
                //const cursorId = cursorForObjectInConnection(productsObjects, object);
                const cursorId = offsetToCursor(products.length);
                return {node: obj.dataValues, cursor: cursorId}
            }
        },
        removeCategoryId: {
            type: categoryEdge,
            resolve: async (obj) => {

                let products = await db.Category.findAll({raw: true});
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

    mutateAndGetPayload: (productId) => {
        console.log(productId)
        deleteProduct(productId)
    }
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
        orderEdge: {
            type: orderEdge,
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

const updateUserMutation = mutationWithClientMutationId({
    name: 'UpdateUser',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
    },

    outputFields: {
        userEdge: {
            type: userEdge,
            resolve: async (obj) => {
            }
        },
        viewer: {
            type: userType,
            resolve: () => userLoader.load('1')
        }
    },

    mutateAndGetPayload: ({name, price}) => addProduct(name, price)
});
const addUserMutation = mutationWithClientMutationId({
    name: 'AddUser',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
    },

    outputFields: {
        userEdge: {
            type: userEdge,
            resolve: async (obj) => {
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
        updateProduct: updateProductMutation,
        deleteProduct: deleteProductMutation,
        deleteCategory: deleteCategoryMutation,
        addCategory: addCategoryMutation,
        updateOrder: updateOrderMutation,
        updateUser: updateUserMutation,
        addUser: addUserMutation
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
