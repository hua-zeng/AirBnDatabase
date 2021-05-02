import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Host.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HostCard from './HostCard';

export default class Host extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			hosts: []
		  }
	}


	componentDidMount() {
		fetch("http://localhost:8081/host",
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(hostList => {
		  if (!hostList) return;
		  let host = hostList.map((hostObj, i) =>
		  
		  <HostCard key={i} host_name={hostObj.host_name} about={hostObj.about} picture={hostObj.picture}
		   url={hostObj.url} num_cities={hostObj.num_cities} num_listings={hostObj.num_listings}/>
		  );
	
		  this.setState({
			hosts: host
		  });
		}, err => {
		  console.log(err);
		});
	}


	render() {

		return (
			<div className="Host">
				<PageNavbar active="host" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>

				<div className="container host-container">
			      <div className="jumbotron">
			        <div className="h5">Top Hosts With Most Listings</div>
					<div> Identify top hosts who have listings in multiple cities. Click on the image to go to their page!
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Host Information</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.hosts}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
			</div>
			</div>
		);
	}
}