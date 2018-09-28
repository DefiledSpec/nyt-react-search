const db = require('../models')

const articleController = {
	save(article, cb) {
		return db.Article.create(article)
	},
	update(id, update) {
		return db.Article.findOneAndUpdate({_id: id}, {$set: update})
	},
	delete(id) {
		return db.Article.deleteOne({_id: id})
	},
	findAll() {
		return db.Article.find({})
	},
	findOne(id) {
		return db.Article.findById(id)
	}
}


module.exports = articleController