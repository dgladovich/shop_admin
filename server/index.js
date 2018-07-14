// @flow
/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';
import config from './config/environment';
import schema from './data/schema';
import router from './router';
import corsPrefetch from 'cors-prefetch-middleware';

if (config.stage === 'graph') {
  // Launch GraphQL
  console.log('Server running in server environment');
  const graphql = express();
  graphql.use(router);
  graphql.use(express.static('uploads'));
  graphql.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema
  }));
  graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)));

} else if (config.stage === 'relay') {
  // Launch Relay by using webpack.config.js
  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/graphql': `http://localhost:${config.graphql.port}`
    },
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });
  relayServer.use(corsPrefetch);


  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, './build')));

  relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));


} else {
  if (config.env === 'development') {
    // Launch GraphQL
    console.log('Server running in development environment');
    const graphql = express();
    graphql.use(router)
    graphql.use(express.static('uploads'));
    graphql.use('/', graphQLHTTP({
      graphiql: true,
      pretty: true,
      schema
    }));
    graphql.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL is listening on port ${config.graphql.port}`)));

    // Launch Relay by using webpack.config.js
    const relayServer = new WebpackDevServer(webpack(webpackConfig), {
      contentBase: '/build/',
      proxy: {
        '/graphql': `http://localhost:${config.graphql.port}`
      },
      stats: {
        colors: true
      },
      hot: true,
      historyApiFallback: true
    });

    // Serve static resources
    relayServer.use('/', express.static(path.join(__dirname, '../build')));
    relayServer.use('/', express.static(path.join(__dirname, '/uploads')));
    relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
  } else if (config.env === 'production') {
    // Launch Relay by creating a normal express server
    const relayServer = express();
    relayServer.use(historyApiFallback());
    relayServer.use('/', express.static(path.join(__dirname, '../build/app')));
    relayServer.use('/graphql', graphQLHTTP({schema}));
    relayServer.listen(config.port, () => console.log(chalk.green(`Relay is listening on port ${config.port}`)));
  }

}

