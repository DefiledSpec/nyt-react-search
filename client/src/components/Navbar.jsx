import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

class Navbar extends React.Component {

	render() {
		return (
			<nav>
				<AppBar position='static' color='primary'>
					<Toolbar>
						<Typography color='inherit'>NYT React Search</Typography>
						<Button color='inherit' component={Link} to='/'>
						Home
						</Button>
						<Button color='inherit' component={Link} to='/saved'>
						Saved
						</Button>
					</Toolbar>
				</AppBar>
			</nav>
		)
	}
}

export default Navbar