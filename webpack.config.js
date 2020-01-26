const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'production',//'production', //'development',//
  output: {
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          mangle: {
            properties: {
              builtins : true,
              regex    : /\.return/
            },
          },
          compress : {
            global_defs: {
              "@alert": "console.log",
              ".return": "['return']",
            },

            properties: false,
            computed_props: false,
          },
          output : {
            keep_quoted_props : true
          }
        },
      }),
    ]
  },
  module: {
    rules : [
      {
        test : /\.js$/,
        use: [
          {
            loader: './loaders/myLoader.js',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: './loaders/isSource.js',
          },
        ]
      }
    ]
  },
  plugins : [
      new webpack.ProvidePlugin( {
          'AV'   : path.resolve( path.join( __dirname, 'modules/common/AV.js' ) ),
          '_'    : path.resolve( path.join( __dirname, 'extantions/underscore.js' ) )
      })
  ],
};