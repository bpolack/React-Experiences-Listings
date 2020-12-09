const defaults = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaults,
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	module: {
		rules: [
			...defaults.module.rules,
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
					publicPath: '/wp-content/plugins/react-experiences-listings/build/images',
				},
			},
		],
	},
};