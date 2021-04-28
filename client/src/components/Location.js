import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Location.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Location extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	componentDidMount() {
		fetch("http://localhost:8081/decades",
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(decList => {
		  if (!decList) return;

		  let allDecades = decList.map((decObj, i) =>
		  <option value={decObj.decade}>{decObj.decade}</option>
		  );
	
		  this.setState({
			decades: allDecades
		  });
		}, err => {
		  console.log(err);
		});
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}


	submitDecade() {
		fetch("http://localhost:8081/location/",
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(moviesList => {
		  if (!moviesList) return;
		  let movie = moviesList.map((moviesObj, i) =>
	
		  <BestGenreRow genre={moviesObj.genre} rating={moviesObj.avg_rating} />
		  );
		  
	
		  this.setState({
			  genres: movie
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
					<div> Return listings around a certain location based on zip code, rating and month descending or sort by price.

			        <div className="zip-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select a zipcode -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
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
			            {this.state.genres}
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