import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Listings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Listings extends React.Component {
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
		fetch("http://localhost:8081/listings/",
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
			<div className="Listings">
				<PageNavbar active="listings" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>

				<div className="container listings-container">
			      <div className="jumbotron">
			        <div className="h5">LISTINGS</div>
					<div> To see information about listings, please select attributes
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select a thing -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Listing info</strong></div>
			            <div className="header"><strong>Listings</strong></div>
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