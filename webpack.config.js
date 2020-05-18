const path = require('path');
const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app'),
    },
    devServer: {
        before: function(app, server) {
            server._watch('./app/**/*.html');
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0', // this will allow device on the same network to be access the webpack devserver from your machine
    },
    mode: 'development',
    // watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                // 'css-loader?url=false' -> dont want to handle url in css files for now, e.g bg-image URLs
                use: ['style-loader', 'css-loader?url=false', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: postCSSPlugins
                    }
                }]
            }
        ]
    }
}