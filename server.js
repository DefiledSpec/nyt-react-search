const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes')
const Article = require('./controllers/savedArticles')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoNYT'
const limit = '50mb'

app.use(logger('dev'))

app.use(bodyParser.json({ limit }))
app.use(bodyParser.urlencoded({ limit, extended: true }))
app.use(express.static('client/public'))

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(cors())

app.use('/api', apiRoutes)
app.get('*', (req, res) => res.sendFile(path.join('/client/build/index.html')))

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`)
	  // Helps to keep the deployment live on Heroku
	setInterval(function() {
		http.get(process.env.HEROKUURL);
	}, 600000); // every 10 minutes
})