const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  webpack: (config, {dev}) => {
    config.module.rules.push({
      test: /(\.s[ac]ss$)|(\.css$)|(\.less$)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    });

    if (!dev) {
      const preLoader = [{
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: false,
          url: true,
          sourceMap: false,
          minimize: true,
          localIdentName: false ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
        },
      },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [
              autoprefixer(),
            ],
          },
        }];
      config.module.rules.push({
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            ...preLoader,
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, 'scss'),
                  path.resolve(__dirname, 'pages'),
                ],
              },
            },
          ],
        }),
      },{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            ...preLoader,
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, 'scss'),
                  path.resolve(__dirname, 'pages'),
                ],
              },
            },
          ],
        }),
      });

      config.plugins.push(new ExtractTextPlugin('/static/app.css'));
    } else {
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          {loader: 'raw-loader'},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true},
          },
        ],
      });
    }

    return config
  }
};
