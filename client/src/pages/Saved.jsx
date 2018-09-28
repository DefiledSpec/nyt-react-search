import React from 'react'
import API from '../controllers/API'
import { Article } from '../components'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'

const styles = {
	paper: {
		maxWidth: '90%',
		margin: '2em auto',
		padding: '1em'
	},
	grid: {
		width: '100%',
		margin: '0 auto'	
	}
}

class Saved extends React.Component {

	state = {
		saved: []
	}

	componentDidMount() {
		this.update()
	}

	update = async () => {
		let saved = await API.getSaved()
		this.setState({saved})
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				{this.state.saved.length > 0 && 
					<Paper className={classes.paper}>
						<Typography variant='headline' align='center' gutterBottom noWrap>Saved Articles</Typography>
						<Grid className={classes.grid} alignContent='center' container spacing={24}>
						{this.state.saved.map(article => (
							<Grid item key={article._id} xs={12} sm={6} md={4} zeroMinWidth>
							<Article
								img={article.img}
								title={article.title}
								url={article.url}
								summary={article.summary}
								_id={article._id}
								update={this.update}
								saved
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

export default withStyles(styles)(Saved)