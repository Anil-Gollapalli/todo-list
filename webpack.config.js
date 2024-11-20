const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",  // Ensure the correct entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", 
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Handles CSS imports
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // If you are using modern JS features or JSX
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Cleans dist folder before each build
    new HtmlWebpackPlugin({
        template: "./index.html",  // Update this if your index.html is in the root folder
        filename: "index.html",
      }),
      
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), // Set the static directory correctly
    port: 8080,
    open: true, // Opens browser on server start
  },
};
