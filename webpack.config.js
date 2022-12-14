const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          static: path.join(__dirname, '/assets')
        }
      };

const esLintPlugin = (isDev) => (isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]);

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    main: './src/index.ts',
    textbook: './src/components/uiListener/uiTextbook.ts',
    statistic: './src/components/statistic/statistic.ts',
    audioCall: './src/components/audio-call/audio-call.ts',
    sprint: './src/components/sprint/sprint.ts',
    dictionary: './src/components/uiListener/uiDictionary.ts'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[path][hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    ...esLintPlugin(development),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({ filename: 'index.html', chunks: ['main'], template: './src/index.html' }),
    new HtmlWebpackPlugin({ filename: 'ebook.html', chunks: ['main', 'textbook'], template: './src/ebook.html' }),
    new HtmlWebpackPlugin({
      filename: 'dictionary.html',
      chunks: ['main', 'dictionary'],
      template: './src/dictionary.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'statistic.html',
      chunks: ['statistic', 'main'],
      template: './src/statistic.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'audio-call.html',
      chunks: ['audioCall', 'main'],
      template: './src/audio-call.html'
    }),
    new HtmlWebpackPlugin({ filename: 'sprint.html', chunks: ['sprint', 'main'], template: './src/sprint.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          noErrorOnMissing: true
        }
      ]
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  ...devServer(development)
});
