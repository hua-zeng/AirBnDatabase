import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class About extends React.Component {
	constructor(props) {
		super(props);


	}

	render() {

		return (
			<div className="About">
				<PageNavbar active="about" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>
			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">About the development team</div>
						<p>AirBnDatabase is a collaborative project developed by Hua Zeng, Katie Pizziketti, Michelle Geng, Sidney Pho.</p>
			    		<br></br>
			    		
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}