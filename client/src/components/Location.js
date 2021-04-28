import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Location.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Location extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedZipcode: "",
			decades: [],
			genres: []
		};

		this.submitZipcode = this.submitZipcode.bind(this);
		this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
	}

	handleZipcodeChange(e) {
		this.setState({
			selectedZipcode: e.target.value
		});
	}


	submitZipcode() {
		fetch("http://localhost:8081/location/"+this.state.selectedZipcode,
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
			          <div className="input-container">
			            <input type='text' placeholder='Enter zip code' value={this.state.selectedZipcode} onChange={this.handleZipcodeChange} id="location" className="movie-input"/>
			            <button className="submit-btn" id="locationSubmitBtn" onClick={this.submitZipcode}>Submit</button>
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