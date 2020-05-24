const currentTask = process.env.npm_lifecycle_event; // currentTask will be either 'dev' or 'build'
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

class RunAfterCompile {
    // How did 'compiler' get in here ?
    apply(compiler) {
        // what is 'compiler.hooks.done.tap' ?
        compiler.hooks.done.tap('Copy images', function() {
            // changes 'dist' to 'docs' cos github pages requires the dir name
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer'),
];

let cssConfig = {
    test: /\.css$/i,
    // 'css-loader?url=false' -> dont want to handle url in css files for now, e.g bg-image URLs
    use: ['css-loader?url=false', {
        loader: 'postcss-loader',
        options: {
            plugins: postCSSPlugins
        }
    }]
}

let pages = fse.readdirSync('./app').filter(function(file) {
    return file.endsWith('.html');
}).map(function(page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module: {
        rules: [
            cssConfig,
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // '@babel/preset-react' added to integrate with react
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    }
}

if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader');
    config.output = {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app'),
    }
    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html');
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0', // this will allow device on the same network to be access the webpack devserver from your machine
    }
    config.mode = 'development';
}

if (currentTask == 'build') {
    cssConfig.use.unshift(MiniCSSExtractPlugin.loader);
    postCSSPlugins.push(require('cssnano'));
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        // changes 'dist' to 'docs' cos github pages requires the dir name
        path: path.resolve(__dirname, 'docs'),
    }
    config.mode = 'production';
    config.optimization = {
        splitChunks: {chunks: 'all'}, // modal chuck, vendors chunk, main chunk
    };
    // RunAfterCompile - abitrary name for our class we use to load the images
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'styles.[chunkhash].css'
        }),
        new RunAfterCompile()
    )
}

module.exports = config;