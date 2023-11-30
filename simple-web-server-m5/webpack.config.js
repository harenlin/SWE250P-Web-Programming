const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = "style-loader";
const config = {
  // entry: ["./app.js", "./myModule.js", "./react.js"],
  entry: ["./app.ts"], 
  output: {
    path: path.resolve(__dirname, "dist"),
    library: {
      name: 'lib',
      type: 'var',
    },
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // look for html template in this directory
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        // use: [stylesHandler, "css-loader"], // if .css load .css
		use: ["style-loader", "css-loader"]
      },
	  {
		test: /\.(png|jpg)$/,
	    loader: 'url-loader',
		type: 'asset/resource',
		options: {
          url: true,
        }
	  },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
