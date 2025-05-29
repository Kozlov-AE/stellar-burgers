const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

require('dotenv').config({
  path: path.join(process.cwd(), '.env')
});

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
       test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL ?? '/'),
      'process.env.BURGER_API_URL': JSON.stringify(process.env.BURGER_API_URL ?? '/'),
    })
  ],
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.svg',
      '.jpg'
    ],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@ui-pages': path.resolve(__dirname, './src/components/ui/pages'),
      '@utils-types': path.resolve(__dirname, './src/utils/types'),
      '@api': path.resolve(__dirname, './src/utils/burger-api.ts'),
      '@slices': path.resolve(__dirname, './src/services/slices'),
      '@selectors': path.resolve(__dirname, './src/services/selectors')
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.PUBLIC_URL || '/',
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    port: 4000
  }
};

console.log(`BURGER_API_URL from .env file: ${process.env.BURGER_API_URL}`);
console.log(`Path to .env file: ${path.join(process.cwd(), '.env')}`);
