const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes')
const Article = require('./controllers/savedArticles')

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoNYT'

app.use(logger('dev'))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
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
app.get('*', (req, res) => res.sendFile('client/build/index.html'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))