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
							path="/Listings"
							render={() => (
								<Listings />
							)}
						/>
						<Route
							path="/Host"
							render={() => (
								<Host />
							)}
						/>
						<Route
							path="/Covid"
							render={() => (
								<Covid />
							)}
						/>
						<Route
							path="/Location"
							render={() => (
								<Location />
							)}
						/>
						<Route
							path="/Reviews"
							render={() => (
								<Reviews />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}