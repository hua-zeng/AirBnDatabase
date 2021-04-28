import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Location.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
		console.log(url);
		fetch(url,
		{
		  method: 'GET'
		}).then(res => {
			console.log(res.json());
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(locationsList => {
		  if (!locationsList) return;
		  let location = locationsList.map((moviesObj, i) =>
		  <BestGenreRow key={i} />
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
			        <div className="h5">LOCATION</div>
					<div> Return all listings that were reviewed for all 12 months in 2020 and with the highest average rating score in descending order.

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
			          <div className="movie">
			            <div className="header"><strong>Rating</strong></div>
			            <div className="header"><strong>Month</strong></div>
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