const webpack = require('webpack')

const config = {
    entry: __dirname + '/src/static/js/index.jsx',
    output: {
        path: __dirname + '/src/static/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
        {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
        ]
    },
    watch: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
};

module.exports = config;