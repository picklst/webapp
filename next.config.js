const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const withSourceMaps = require( '@zeit/next-source-maps' );

const customConfig = {
    // for turning of dev indicators
    devIndicators: {
        autoPrerender: false,
    },

    // used for developing inside docker container
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config
    },
};

module.exports = withPlugins([
    [withSourceMaps],
    [css],
    [sass, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
    }],
], customConfig);