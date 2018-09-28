const expect = require('chai').expect
const app = require('../controllers/savedArticles')
const nyt = require('../utils/nyt')

describe('nyt', () => {
	it('should retrieve articles for dogs', async function() {
		let articles = await nyt.search('dogs')
		expect(articles).to.be.an('array')	
	})
})