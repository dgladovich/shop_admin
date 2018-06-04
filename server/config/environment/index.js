/* eslint-disable global-require */
import _ from 'lodash';

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    stage: process.env.STAGE || '',
    purp: process.env.PURP || '',
    graphql: {
        port: 8000
    }
};

export default _.extend(config, require(`./${config.env}`).default);
