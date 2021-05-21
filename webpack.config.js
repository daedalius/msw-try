const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    path: resolve('./dist/app'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: ['last 2 Chrome versions'],
                  node: 'current',
                },
              },
            ],
            '@babel/react',
            '@babel/preset-typescript',
          ],
          plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '#components': resolve(__dirname, `./src/components`),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // Register MSW for non-production builds
    process.env.NODE_ENV !== 'production'
      ? new CopyWebpackPlugin({
          patterns: [{ from: './src/mocks/mockServiceWorker.js' }],
        })
      : false,
  ].filter(Boolean),
};
