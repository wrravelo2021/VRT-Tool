var path = require("path");

module.exports = {
	entry: "./client/index.js",
	output: {
		path: path.join(__dirname, "client"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /.jsx?$/,
			loader: "babel-loader",
			exclude: /node_modules/,
			query: {
				presets: ["es2016", "react"]
			}
		},
			{
				test: /\.css$/,
				loader: ["style-loader", "css-loader"]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "url-loader?name=client/img/[name].[ext]"
			}]
	},
	performance: {
		hints: false
	},
	node: {
		fs: 'empty'
	}
}
