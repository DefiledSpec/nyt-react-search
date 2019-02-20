import axios from 'axios'

const API = {
	getNYT: async (query) => {
		let articles = await axios.get(`/api/search/${query}`)
		return articles.data
	},
	async popular() {
		let articles = await axios.get(`/api/popular`)
		console.log(articles)
		return articles.data
	},
	save: async (article) => {
		let saved = await axios.post(`/api/save`, article)
		return saved.data
	},
	getSaved: async () => {
		let saved = await axios.get(`/api/saved`)
		return saved.data
	},
	remove: async (id) => {
		let removed = await axios.delete(`/api/saved/${id}`)
		return removed.data
	},
	update: async (id) => {
		let updated = await axios.put(`/api/saved/${id}`)
		return updated.data
	}
}

export default API