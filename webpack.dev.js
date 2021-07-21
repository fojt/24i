const path = require('path');
const common = require("./webpack.config.js")
const { merge } = require("webpack-merge");


module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
});
