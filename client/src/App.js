import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Saved, NoMatch } from './pages'
import withRoot from './withRoot'
import { Navbar } from './components'

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/saved' component={Saved} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default withRoot(App)
