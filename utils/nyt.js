require('dotenv').config()
const axios = require('axios')

const nyt = {
	url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.API_KEY}`,
	mostViewed: `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Technology/30.json?api-key=${process.env.API_KEY}`,
	async search(query) {
		try {
			let res = await axios.get(`${this.url}&q=${query}`, { method: 'GET' })
			let { docs } = res.data.response
			let articles = docs.map((article, id) => {
				let published = article.pub_date
				let summary = article.snippet
				if(article.snippet.startsWith('<p>') && article.snippet.endsWith('</p>')) {
					summary = article.snippet.substring(3, article.snippet.length - 4)
				}
				return {
					id: article._id,
					title: article.headline.main,
					url: article.web_url,
					img: article.multimedia.filter(media => media.type === 'image')[0],
					summary,
					published
				}
			})
			return articles
		} catch(err) {
			console.log(err)
		}
	},
	async popular() {
		try {
			let res = await axios.get(this.mostViewed, { method: 'GET' })
			let { results } = res.data
			let articles = results.map((article, i) => {
				let published = article.published_date
				let summary = article.snippet
				if(article.abstract.startsWith('<p>') && article.abstract.endsWith('</p>')) {
					summary = article.abstract.substring(3, article.abstract.length - 4)
				}
				return {
					id: i,
					title: article.title,
					url: article.url,
					img: article.media.filter(media => media.type === 'image')[0]['media-metadata'][1].url.substring(25),
					summary,
					published
				}
			})
			return articles
		} catch(err) {
			console.log(err)
		}
	}
}

// let cats = nyt.search('cats')
// cats.then(articles => console.log(articles.data.response.docs[0]))

module.exports = nyt