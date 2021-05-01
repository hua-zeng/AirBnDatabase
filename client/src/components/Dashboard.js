import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import { Line } from 'react-chartjs-2';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of cities,
    // and a list of listings for a specified city.
    this.state = { 
      cities: [], 
      listings: [] 
    }
    
    this.showListings = this.showListings.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/cities",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(cityList => {
      if (!cityList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each city.
      let cityDivs = cityList.map((cityObj, i) =>
      <GenreButton id={"button-" + cityObj.city} onClick={() => this.showListings(cityObj.city)} city={cityObj.city} />
      );

      

      // Set the state of the cities list to the value returned by the HTTP response from the server.
      this.setState({
        cities: cityDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showListings(city) {
  //similar to component did mount
  //fetch from fetch("http://localhost:8081/cities" + city,

  //get method
  //line 39: instead of genrebutton, use dashboardmovierow
  // set state to listings 
  fetch("http://localhost:8081/cities/" + city,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err); 
    }).then(listingsList => {
      if (!listingsList) return;
      let listing = listingsList.map((listingsObj, i) =>

      <DashboardMovieRow listing_id={listingsObj.listing_id} listing_name={listingsObj.listing_name} city_name={listingsObj.city_name} neighborhood={listingsObj.neighborhood} avg_review_scores_rating={listingsObj.avg_review_scores_rating} number_of_reviews={listingsObj.number_of_reviews}/>
      );
      

      // Set the state of the cities list to the value returned by the HTTP response from the server.
      this.setState({
        listings: listing
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
}

  render() {    

    return (
      <div className="Dashboard">
        <div style={{backgroundColor: 'white', minHeight:1000}}>

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5"><p style={{color:'black', fontSize: 32, fontFamily:'Georgia'}}>Top Listings</p></div>

          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>listing_id</strong></div>
                <div className="header"><strong>listing_name</strong></div>
                <div className="header"><strong>city_name</strong></div>
                <div className="header-lg"><strong>neighborhood</strong></div>
                <div className="header"><strong>avg_review_scores_rating</strong></div>
                <div className="header"><strong>number_of_reviews</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.listings}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}