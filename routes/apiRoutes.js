const router = require('express').Router()
const db = require('../models')
const nyt = require('../utils/nyt')
const articleController = require('../controllers/savedArticles')

router.get('/search/:query', async (req, res) => {
	try {
		let articles = await nyt.search(req.params.query)
		res.json( articles )
	} catch(err) {
		res.end(`${err}`)
	}
})

router.get('/popular', async (req, res) => {
	try {
		let articles = await nyt.popular()
		res.json(articles)
	} catch(err) {
		console.log(err)
	}
})

router.post('/save', async (req, res) => {
	try {
		let { title, img, url, summary, published } =  req.body
		let saved = await articleController.save({title, img, url, summary, published})
		res.json(saved)
	} catch(err) {
		res.end(err.toString())
	}
})

router.get('/saved', async (req, res) => {
	try {
		let saved = await articleController.findAll()
		res.json(saved)
	} catch(err) {
		res.end(err.toString())
	}
})

router.delete('/saved/:id', async (req, res) => {
	try {
		let deleted = await articleController.delete(req.params.id)
		res.json(deleted)
	} catch(err) {
		res.end(err.toString())
	}
})

module.exports = router