const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	img: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now()
	},
	url: {
		type: String,
		required: true
	},
	summary: {
		type: String
	},
	published: {
		type: Date
	}
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article