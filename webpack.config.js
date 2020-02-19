var WebpackDevServer = require("webpack-dev-server");
const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    watch       : true,
    mode        : 'development',//'production', //'development',//
    entry       : [
        './src/index.jade',
        './src/scss/styles.scss',
        './src/js/main.js',
    ],
    output      : {
        filename  : 'js/main.js',
        publicPath: './',
        path      : path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
        ]
    },
    // devtool:'inline-source-map',
    module      : {
        rules: [
            {
                test   : /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                // use    : {
                //     loader : 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
                // }
            },
            {
                test: /\.html$/,
                // loader: 'html-loader'
                use : {
                    loader : 'html-loader',
                    options: {
                        // conservativeCollapse: false,
                        // minimize            : true,
                        attrs               : ['link:href', 'link:type'],
                    },
                },
            },
            {
                test: /\.jade$/,
                use : [
                    'html-loader',
                    // 'raw-loader',
                    'pug-html-loader'
                ],

            },
            {
                test: /\.css$/,
                // exclude: /slick/,
                use : [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use : [
                    'style-loader',
                    {
                        loader : MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader : 'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader : 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions'],
                            }
                        }
                    },
                    // 'resolve-url-loader',
                    'sass-loader',
                    // 'resolve-url'
                ],
            },

            {
                test: /\.(png|jpe?g|gif|svg|)$/i,
                use : [
                    {
                        loader : 'file-loader',
                        options: {
                            name           : '[folder]/[name].[ext]',
                            outputPath     : 'images',
                            esModule       : false,
                            useRelativePath: true,

                        },
                    }
                ]
            },
            {
                test   : /\.(ttf|otf|webp|eot|woff|woff2)$/i, //
                loader : 'file-loader',
                options: {
                    name      : '[name].[ext]',
                    outputPath: 'fonts',
                },
            },
        ]
    },
    plugins     : [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
            // chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            favicon: './src/images/favicon.ico',
            filename: 'index.html',
            template: './src/index.jade',
            minify  : true,
            // injec   : 'body'
        }),
        autoprefixer
    ],
    devServer   : {
        // contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')]
        contentBase     : './dist',
        watchContentBase: true,
        port            : 9001
    },
};