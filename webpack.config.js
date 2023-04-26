const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname,'src','index.js'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'build.js',
    },
    plugins:[new HTMLWebpackPlugin({
        title:"Quiz",
        template: path.resolve(__dirname,'src','index.html')
    })],
    module:{
        rules:[
            {
                test: /\.html$/i,
                loader:'html-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    }
};