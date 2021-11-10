export default function (baseApi) {
	return {
		intervals: {
			logout: 3600 // 1 hour in seconds
		},
		api: {
			dashboard: `${baseApi}/api/v1/dashboards`,
			schedule: `${baseApi}/api/v1/schedule`
		},
		token: {
			auth: process.env.AUTH_TOKEN
		},
		isProduction: true,
		isDevelopment: false
	}
}
