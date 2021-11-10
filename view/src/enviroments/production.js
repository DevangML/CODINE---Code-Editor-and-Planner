import environment from './base'
const baseApi = 'http://www.your-production-api.com'
const env = environment(baseApi)
export default {
	...env
}
