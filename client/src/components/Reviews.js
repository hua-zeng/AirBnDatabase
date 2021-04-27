import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Reviews.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Reviews extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			recMovies: []
		}

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	}

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	}


	submitMovie() {
		fetch("http://localhost:8081/reviews/" + this.state.movieName,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(moviesList => {
      if (!moviesList) return;
      let movie = moviesList.map((moviesObj, i) =>

      <RecommendationsRow title={moviesObj.title} id={moviesObj.id} rating={moviesObj.rating} votes={moviesObj.vote_count} />
      );
      

      this.setState({
		  recMovies: movie
	  });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	}

	
	render() {

		return (
			<div className="Reviews">
				<PageNavbar active="reviews" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>
			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">REVIEWS</div>
						<p>Reviews of listings.</p>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="write something" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
			    		</div>
			    		<div className="header-container">
			    			<div className="headers">
			    				<div className="header"><strong>City</strong></div>
			    				<div className="header"><strong>AirBnB Listings</strong></div>
					            <div className="header"><strong>Reviews</strong></div>
					            <div className="header"><strong>Month</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recMovies}
			    		</div>
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}