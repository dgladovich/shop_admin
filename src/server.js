import path from 'path';
import express from 'express';
import expressGraphQL from 'express-graphql';
import React from 'react';
import PrettyError from 'pretty-error';
import models from './data/models';
import db from './db/models';
import schema from './data/schema';
import config from './config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
//import jwt from 'jsonwebtoken';
//import nodeFetch from 'node-fetch';
//import assets from './assets.json'; // eslint-disable-line import/no-unresolved
//import passport from './passport';

const app = express();
console.log('server starting')

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
/*app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);*/
// Error handler for express-jwt
/*app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cooksies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});*/

//app.use(passport.initialize());
if (__DEV__) {
  app.enable('trust proxy');
}
//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    res.end('build/index.html');
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
/*app.use((err, req, res, next) => {
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(``);
});*/

app.use(function(err, req, res, next) {
    // in case of specific URIError
    if (err instanceof URIError) {
        err.message = 'Failed to decode param: ' + req.url;
        err.status = err.statusCode = 400;

        // .. your redirect here if still needed
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    } else {
        // ..
    }
    // ..
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
const DB = db.sequelize.sync().catch(err => console.error(err.stack));

if (!module.hot) {
    DB.then(()=>{
        console.log('my sequelize db installed successfully')
        app.listen(config.port, () => {
            console.info(`The server is running at http://localhost:${config.port}/`);
        });
    });
}
//
// Hot Module Re placement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  //module.hot.accept('./router');
}

export default app;
