import React from 'react'
import { Search, Article } from '../components'
import { Typography, Paper, Grid } from '@material-ui/core'
import API from '../controllers/API'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	paper: {
		maxWidth: '90%',
		margin: '0 auto',
		paddingTop: '1em',
	},
	grid: {
		width: '100%',
		margin: '0 auto'	
	},
	jumbotron: {
		padding: '2em 6em',
		width: 'max-content',
		margin: '2em auto'
	}
}

class Home extends React.Component {

	state = {
		articles: [],
		saved: [],
		status: ''
	}

	componentDidMount = () => {
		API.popular().then(data => this.setState({
			articles: data,
			status: `Displaying top ${data.length} most viewed articles.`
		}))
	}

	handleSearch = (query) => {
		API.getNYT(query).then((data) => this.setState({
			articles: data,
			status: `Displaying ${data.length} results for '${query}'.`
		}))

	}

	render() {
		const { classes } = this.props
		return (
			<div>
				<Paper className={classes.jumbotron}>
					<Typography align='center' variant='display1' gutterBottom>Search New York Times</Typography>
				<Search handleSearch={this.handleSearch} />
				</Paper>
				{this.state.articles.length > 0 && 
					<Paper className={classes.paper}>
						<Typography align='center' variant='headline' gutterBottom noWrap>{this.state.status}</Typography>
						<Grid className={classes.grid} alignContent='center' container spacing={24}>
						{this.state.articles.map(article => (
							<Grid item key={article.id} xs={12} sm={6} md={4} lg={3} zeroMinWidth>
							<Article
								img={article.img}
								title={article.title}
								url={article.url}
								summary={article.summary}
								published={article.published}
							/>
							</Grid>
						))}
						</Grid>
					</Paper>
				}
			</div>
		)
	}
}

export default withStyles(styles)(Home)