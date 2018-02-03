import React from 'react';
import Router from 'universal-router';
import { graphql } from 'relay-runtime';

const routes = [
  {
    path: '/',
    components: () => [
      import(/* webpackChunkName: 'home' */ './Home'),
      import(/* webpackChunkName: 'home' */ './Home/Hero'),
    ],
    render: ([Home, Hero], data) => ({
      title: 'Home page',
      hero: <Hero />,
      body: <Home stories={data.stories} />,
    }),
  },
  {
    path: '/story-:id',
    components: () => [import(/* webpackChunkName: 'home' */ './Story')],
    render: ([Story], data) => ({
      title: data.title,
      body: <Story story={data.story} />,
    }),
  },
  {
    path: '/error',
    components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
    render: ([ErrorPage]) => ({
      title: 'Error',
      body: <ErrorPage />,
    }),
  },
  {
    path: '/getting-started',
    components: () => [
      import(/* webpackChunkName: 'start' */ './GettingStarted'),
    ],
    render: ([GettingStarted]) => ({
      title: 'Getting Started',
      body: <GettingStarted />,
    }),
  },
  {
    path: '/about',
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ([About]) => ({
      title: 'About Us',
      body: <About />,
    }),
  },
  {
    path: '/tasks/:status(pending|completed)?',
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home]) => ({
      title: 'Untitled Page',
      body: <Home />,
    }),
  },
];

function resolveRoute({ route, fetch, next }, params) {
  // Skip routes that have no .render() method
  if (!route.render) return next();

  // Shape the result to be passed into the top-level React component (App)
  return {
    params,
    query: route.query,
    variables:
      typeof route.variables === 'function'
        ? route.variables(params)
        : { ...params },
    components:
      typeof route.components === 'function'
        ? Promise.all(
            route.components().map(promise => promise.then(x => x.default)),
          ).then(components => (route.components = components))
        : route.components,
    render: route.render,
  };
}

export default new Router(routes, { resolveRoute });
