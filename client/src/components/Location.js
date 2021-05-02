import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Location.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BestLocationRow from './BestLocationRow';

export default class Location extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//pre-selected value for dropdown menu is Austin
			selectedCity: "Austin",
			//pre-selected value is January
			selectedMonth: "1",
			locations: []
		};

		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.submitLocation = this.submitLocation.bind(this);
	}

	handleLocationChange(e) {
		this.setState({
			selectedCity: e.target.value
		});
	}
	handleMonthChange(e) {
		this.setState({
			selectedMonth: e.target.value
		});
	}


	submitLocation() {
		const url = "http://localhost:8081/location/" + this.state.selectedCity+"/"+this.state.selectedMonth;
		fetch(url,
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(locationsList => {
			console.log(locationsList);
		  if (!locationsList) return;
		  let location = locationsList.map((locationsObj, i) =>
		  
		  <BestLocationRow key={i} url={locationsObj.url} listing_name={locationsObj.listing_name} neighborhood={locationsObj.neighborhood} 
		  rating={locationsObj.review_scores_rating} price={locationsObj.price}/>
		  );

		  this.setState({
			  locations: location
		  });

		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});	
	}

	render() {

		return (
			<div className="Location">
				<PageNavbar active="location" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>

				<div className="container location-container">
			      <div className="jumbotron">
			        <div className="h5"><strong>LOCATION</strong></div>
					<div>  Available listings information, including name, neighborhood, price, and rating for a given city and month based on users’ inputs, e.g. Austin, March (month = 3).

			        <div className="zip-container">
			          <div className="input-container">
					  <select value={this.state.selectedCity} onChange={this.handleLocationChange}>
							<option value="Austin">Austin</option>
							<option value="San Francisco">San Francisco</option>
							<option value="Washington">Washington</option>
						</select>
						<select value={this.state.selectedMonth} onChange={this.handleMonthChange}>
							<option value="1">January</option>
							<option value="2">February</option>
							<option value="3">March</option>
							<option value="4">April</option>
							<option value="5">May</option>
							<option value="6">June</option>
							<option value="7">July</option>
							<option value="8">August</option>
							<option value="9">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
			            <button className="submit-btn" id="locationSubmitBtn" onClick={this.submitLocation}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movies-header">
			            <div className="header"><strong>Listing</strong></div>
			            <div className="header"><strong>Neighborhood</strong></div>
						<div className="header"><strong>Rating (out of 100)</strong></div>
			            <div className="header"><strong>Price</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.locations}
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