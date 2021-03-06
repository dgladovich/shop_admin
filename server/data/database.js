// @flow
import DataLoader from 'dataloader';
import db from '../models';

class User {
    id: string;
    name: string;
    username: string;
    website: string;
    features: Array<string>;

    constructor(id: string, name: string, username: string, website: string, features: Array<string>) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.website = website;
        this.features = features;
    }
}

class Feature {
    id: string;
    name: string;
    description: string;
    url: string;

    constructor(id: string, name: string, description: string, url: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
    }
}

class Product {
    id: string;
    name: string;
    price: number;

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Category {
    id: string;
    title: string;
    view_title: string;
    image: string;
    description: string;
    parent: number;

    constructor(id: string, title: string, view_title: string, image: string, description: string, parent: number,) {
        this.id = id;
        this.title = title;
        this.view_title = view_title;
        this.image = image;
        this.description = description;
        this.parent = parent;
    }
}

const features = [
    new Feature('1', 'React', 'A JavaScript library for building user interfaces.', 'https://facebook.github.io/react'),
    new Feature('2', 'Relay', 'A JavaScript framework for building data-driven react applications.', 'https://facebook.github.io/relay'),
    new Feature('3', 'GraphQL', 'A reference implementation of GraphQL for JavaScript.', 'http://graphql.org'),
    new Feature('4', 'Express', 'Fast, unopinionated, minimalist web framework for Node.js.', 'http://expressjs.com'),
    new Feature('5', 'Webpack', 'Webpack is a module bundler that packs modules for the browser.', 'https://webpack.github.io'),
    new Feature('6', 'Babel', 'Babel is a JavaScript compiler. Use next generation JavaScript, today.', 'https://babeljs.io'),
    new Feature('7', 'PostCSS', 'PostCSS. A tool for transforming CSS with JavaScript.', 'http://postcss.org'),
    new Feature('8', 'MDL', 'Material Design Lite lets you add a Material Design to your websites.', 'http://www.getmdl.io')
];

const lvarayut = new User('1', 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack', features.map(feature => feature.id));

/*
* Add feature in memory
*/

function getUser(id: string) {
    return id === lvarayut.id ? lvarayut : null;
}


function getFeature(id: string) {
    return features.find(w => w.id === id);
}

function getFeatures() {
    return features;
}

function getProducts(d) {

}

function fetchUser(id) {
    return new Promise((resolve) => {
        resolve(getUser(id));
    });
}

function fetchFeature(id) {
    return new Promise((resolve) => {
        resolve(getFeature(id));
    });
}

function fetchProducts() {

    return db.Product.findAll()
}

const userLoader = new DataLoader(
    ids => Promise.all(ids.map(fetchUser))
);

const featureLoader = new DataLoader(
    ids => {
        console.log(ids)
        return Promise.all(ids.map(fetchFeature))
    }
);

const productLoader = new DataLoader(
    () => {
        return fetchProducts()
    }
);

let curFeatures = 9;

function addFeature(name: string, description: string, url: string) {
    const newFeature = new Feature(curFeatures.toString(), name, description, url);
    features.push(newFeature);
    lvarayut.features.push(newFeature.id);
    featureLoader.clear(newFeature.id);
    userLoader.clear(lvarayut.id);
    curFeatures += 1;
    return newFeature;
}

function addProduct(name: string, price: number, created_at: string, updated_at: string) {
    return db.Product.create({
        name: name,
        price: price,
        created_at: created_at,
        updated_at: created_at,
    }).then((product) => {
        return product;
    })
}
function deleteProduct(id) {
    return db.Product.destroy({where: {id: id}});
}

function addCategory(categoryData) {

    return db.Category.create(categoryData).then((category) => {
        return category;
    })
}

export {
    userLoader,
    featureLoader,
    productLoader,
    User,
    Feature,
    Product,
    Category,
    getFeatures,
    getProducts,
    addFeature,
    addProduct,
    addCategory,
    deleteProduct
};
