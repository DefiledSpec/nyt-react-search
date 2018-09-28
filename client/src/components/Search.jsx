import React from 'react'
import { TextField, Button, FormControl } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		maxWidth: 'max-content',
		padding: '1em 2em',
		margin: '1.5em auto'
	}
}

class Search extends React.Component {
	state = {
		query: '',
		articles: []
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({
			[name]: value
		})
	}

	handleSearch = (e) => {
		e.preventDefault()
		let sanitized = this.state.query.trim()
		this.props.handleSearch(sanitized)
	}

	render() {
		let { classes } = this.props
		return (
			
				<form className={ classes.root } onSubmit={this.handleSearch}>
					<FormControl>
						<TextField margin='normal' type="text" name='query' onChange={this.handleChange} value={ this.state.query } />
						<Button variant='contained' color='primary' onClick={this.handleSearch}>Search</Button>
					</FormControl>
				</form>
		
		)
	}
}

export default withStyles(styles)(Search)