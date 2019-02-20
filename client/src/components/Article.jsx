import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button, CardActions, CardActionArea } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import API from '../controllers/API'

const styles = {
	card: {
		maxWidth: '90%',
		margin: '0 auto',
	}
}

class Article extends React.Component {

	handleSave = () => {
		let { title, summary, url, published } = this.props
		let imgURL = typeof this.props.img === 'object' ? this.props.img.url : this.props.img
		API.save({title, summary, url, img: imgURL, published})
	}
	
	handleRemove = (id) => {
		console.log(id)
		API.remove(id)
		this.props.update()
	}

	render() {
		let { classes } = this.props
		console.log(this.props)
		return (
			<article >
				<Card className={classes.card}>
					<CardActionArea>
						{this.props.img && <CardMedia
							image={`https://static01.nyt.com/${typeof this.props.img === 'object' ? this.props.img.url : this.props.img }`}
							component='img'
						/>}
						<CardContent>
							<Typography variant='headline' gutterBottom component='h2'>
								{this.props.title}
							</Typography>
							<Typography component="p">
								{this.props.summary}
          					</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary" component='a' href={this.props.url}>
						Full Article
						</Button>
						{!this.props.saved ? 
							<Button onClick={this.handleSave} size="small" color="primary">
							Save
							</Button>
						:
							<Button onClick={() => this.handleRemove(this.props._id)} size="small" color="secondary">
							Remove
							</Button>
						}	
					</CardActions>
				</Card>
			</article>
		)
	}
}

export default withStyles(styles)(Article)