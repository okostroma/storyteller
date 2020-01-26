const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlMinifierPlugin = require('html-minifier-terser');

const cssExtractor = new ExtractTextPlugin("css", "[name].[id].css");
const htmlExtractor = new ExtractTextPlugin("html", "[name].html");

module.exports = {
    watch       : false,
    mode        : 'production',//'production', //'development',//
    entry       : [
        './src/index.jade',
        './src/sass/styles.sass'
    ],
    output      : {
        // path: './dist',
        // filename: 'bundle-[name].[ext]',
        // filename: 'index.html',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            // new TerserPlugin({
            //     terserOptions: {
            //         ecma    : 5,
            //         mangle  : {
            //             properties: {
            //                 builtins: true,
            //                 regex   : /\.return/
            //             },
            //         },
            //         compress: {
            //             global_defs: {
            //                 "@alert" : "console.log",
            //                 ".return": "['return']",
            //             },
            //
            //             properties    : false,
            //             computed_props: false,
            //         },
            //         output  : {
            //             keep_quoted_props: true
            //         }
            //     },
            // }),
        ]
    },
    module      : {
        rules: [
            {
                test  : /\.html$/,
                loader: 'html-loader'
            },
            {
                test   : /\.jade$/,
                loader : 'jade-loader',
                options: {
                    name: '[name].jade',
                },
            },
            {
                test: /\.css$/,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader : 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions'],
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test   : /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader : 'url-loader',
                options: {
                    limit: 8192,
                },
            },
            {
                test  : /\.(ttf|otf|webp)$/i,
                loader: 'file-loader',

                options: {
                    name      : '[name].[ext]',
                    outputPath: 'fonts',
                },
            },
            {
                test: /\.png$/,
                use : [
                    {
                        loader : 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            }
        ]
    },
    plugins     : [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css',
            // chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title   : 'My App',
            template: './src/index.jade',
            minify  : true,
            injec   : 'body'
        }),
        autoprefixer
    ],
    devServer   : {
        contentBase: './dist',
    },
};