const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const OptimizedImages = require('next-optimized-images');
const withSourceMaps = require( '@zeit/next-source-maps' );
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const customConfig = {
    // for turning of dev indicators
    devIndicators: {
        autoPrerender: false,
    },

    //minify
    // webpack: (config, options) => {
    //     // config.plugins = config.plugins.filter(
    //     //     (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    //     // ),
    //     config.optimization.minimize = true;
    //     return config
    // },
    // used for developing inside docker container
    // webpackDevMiddleware: config => {
    //     // config.watchOptions = {
    //     //     poll: 1000,
    //     //     aggregateTimeout: 300,
    //     // };
    //     // return config
    //
    //
    // },

    generateInDevMode: true,
    workboxOpts: {
        runtimeCaching: [
            {
                urlPattern: /.png$/,
                handler: 'CacheFirst'
            },
            {
                urlPattern: /api/,
                handler: 'NetworkFirst',
                options: {
                    cacheableResponse: {
                        statuses: [0, 200],
                        headers: {
                            'x-test': 'true'
                        }
                    }
                }
            }
        ]
    },
};

module.exports = withPlugins([
    [withSourceMaps],
    [withOffline],
    [css],
    [sass, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
    }],
    [withBundleAnalyzer, {
        enabled: true,
    }],
    [OptimizedImages],
], customConfig);