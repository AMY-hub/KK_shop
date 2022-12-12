/** @type {import('next').NextConfig} */

module.exports = {
	staticPageGenerationTimeout: 120,
	images: {
		domains: ['localhost', 'kkshop.onrender.com', 'kk-shop-server.vercel.app', 'api.kkshop.site']
	},
	webpack(config, options) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [{
						name: 'preset-default',
						params: {
							override: {
								removeViewBox: false
							}
						}
					}],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};