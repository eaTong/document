const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  webpack: (config, {dev}) => {
    if (dev) {
      config.module.rules.push(
        {
          test: /\.(css|less|sass|scss)/,
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        }, {
          test: /\.css$/,
          use: ['babel-loader', 'raw-loader', 'postcss-loader']
        }, {
          test: /\.less$/,
          use: ['babel-loader', 'raw-loader', 'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                includePaths: ['styles', 'node_modules']
                  .map((d) => path.join(__dirname, d))
                  .map((g) => glob.sync(g))
                  .reduce((a, c) => a.concat(c), [])
              }
            }
          ]
        }, {
          test: /\.s[ac]ss$/,
          use: ['babel-loader', 'raw-loader', 'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['styles', 'node_modules']
                  .map((d) => path.join(__dirname, d))
                  .map((g) => glob.sync(g))
                  .reduce((a, c) => a.concat(c), [])
              }
            }
          ]
        }
      );
    } else {
      config.module.rules.push({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                url: true,
                sourceMap: false,
                minimize: true,
                localIdentName: '[hash:base64:5]'
              }
            },
            {loader: 'postcss-loader'}
          ]
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                url: true,
                sourceMap: false,
                minimize: true,
                localIdentName: '[hash:base64:5]'
              }
            },
            {loader: 'postcss-loader'},
            {loader: 'less-loader'}
          ]
        })
      }, {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                url: true,
                sourceMap: false,
                minimize: true,
                localIdentName: '[hash:base64:5]'
              }
            },
            {loader: 'postcss-loader'},
            {loader: 'sass-loader'},
          ]
        })
      });
      config.plugins.push(
        new ExtractTextPlugin('styles.css')
      );
    }

    return config
  }
};

function generateLoader(name,) {

}
