// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    preferRelative: true,
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      icons: path.resolve(__dirname, "src/icons/"),
      pages: path.resolve(__dirname, "src/pages/"),
      state: path.resolve(__dirname, "src/state/"),
      types: path.resolve(__dirname, "src/types/"),
      middlewares: path.resolve(__dirname, "src/middlewares/"),
      utils: path.resolve(__dirname, "src/utils/"),
      widgets: path.resolve(__dirname, "src/widgets/"),
      api: path.resolve(__dirname, "src/api/"),
      context: path.resolve(__dirname, "src/context/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
    }
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
