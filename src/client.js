import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import history from './history';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

console.log('client is launching')
const render = props =>
  new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <App {...props} />,
        document.getElementById('root'),
        resolve(props),
      );
    } catch (err) {
      reject(err);
    }
  });

const resolve = promise =>
  promise.then(({ /*user,*/ location }) =>
    routes.resolve({
      pathname: location.pathname,
      location,
      //user,
      render,
    }),
  );

let promise;
if (!promise) {
    promise = Promise.resolve({ /*user,*/ location: history.location });
    history.listen(location => {
        promise = resolve(promise.then(x => ({ ...x, location })));
    });
}
promise = resolve(promise.then(x => ({ ...x/*, user*/ })));

registerServiceWorker();
