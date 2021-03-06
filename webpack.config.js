const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//console.log('build started');

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    //publicPath: '/build/',
    filename: 'index.js'
  },
  devServer: {
    publicPath: "/",
    contentBase: "./src",
    hot: true,
    inline: true,
    host:"0.0.0.0",	  
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        //include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "10"
                  }
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-react-jsx"
            ]
          }
        }
      },

      {
        test: /\.css$/,
        // test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        // test: /\.css$/,
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|jpeg|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            // options: { 
            //   name: 'logo.jpeg',
            //   outputPath: '/'
            // }
          }
        ]
      }
    ]
  }

};
