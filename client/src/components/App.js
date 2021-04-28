import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Listings from './Listings';
import Host from './Host';
import Covid from './Covid';
import Location from './Location';
import Reviews from './Reviews';
import About from './About';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/listings"
							render={() => (
								<Listings />
							)}
						/>
						<Route
							path="/host"
							render={() => (
								<Host />
							)}
						/>
						<Route
							path="/covid"
							render={() => (
								<Covid />
							)}
						/>
						<Route
							path="/locations"
							render={() => (
								<Location />
							)}
						/>
						<Route
							path="/reviews"
							render={() => (
								<Reviews />
							)}
						/>
						<Route
							path="/about"
							render={() => (
								<About />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}