const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =(env) => {
  console.log('env',env);
  return {
      mode: 'development',
      entry: {
        index: './src/index.js',
      },
      output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
      },
      devtool: 'inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot:true
      },
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      },
      module: {
        rules: [
          {
            test: /.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                presets: ['@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime'],
                cacheDirectory:true
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          },
          {
            test: /\.less$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "less-loader" },
            ],
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'./src/index.html'),
        title: 'Development',
        }),
      ],
    }
  };