import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import DashboardListingRow from './DashboardListingRow';
import '../style/Dashboard.css';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of cities,
    // and a list of listings for a specified city.
    this.state = { 
      listings: [] 
    }
    
    this.showListings = this.showListings.bind(this);
  }


  showListings(city) {
  fetch("http://localhost:8081/cities/" + city,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err); 
    }).then(listingsList => {
      if (!listingsList) return;
      console.log(listingsList);
      let listing = listingsList.map((listingsObj, i) =>
      <DashboardListingRow key={i} listing_name={listingsObj.listing_name} neighborhood={listingsObj.neighborhood} avg_review_scores_rating={listingsObj.avg_review_scores_rating}/>
      );

      // Set the state of the cities list to the value returned by the HTTP response from the server.
      this.setState({
        listings: listing
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
};

  render() {    

    return (
      <div className="Dashboard">
        <div style={{backgroundColor: 'white', minHeight:1000}}>
        <PageNavbar active="dashboard" />
        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5"><p style={{color:'black', fontSize: 32, fontFamily:'Georgia'}}>Top 10 Listings By City</p></div>
            <div className="row">
              <div className="column">
                <input type="image" src="http://res.cloudinary.com/simpleview/image/upload/v1556138353/clients/austin-redesign/Austin_Convention_Visitors_Bureau_geoffduncan_02_exp_May_2020_86333b4b-0b53-4f58-a79b-b33a6d6cdbe3.jpg" className="image" width="330" height="260" alt="Austin"  onClick={this.showListings.bind(this, 'Austin')}/>
                <div className="middle">
                  <div className="text">
                    Austin
                  </div>
                </div>
              </div>
              <div className="column"><input type="image" src="https://media.istockphoto.com/photos/san-francisco-picture-id628092860?k=6&m=628092860&s=612x612&w=0&h=qSbJvbn4KawWRhsk2YsMYqoqshApzYc2Ugt7jE7-cGI=" className="image" width="330" height="260" alt="San Francisco" onClick={this.showListings.bind(this, 'San Francisco')}/>
              <div className="middle">
                  <div className="text">
                    San Francisco
                  </div>
                </div></div>
              <div className="column"><input type="image" src="http://static.trip101.com/paragraph_media/pictures/002/272/230/large/washington-d-1624419_960_720.jpg?1604046868" alt="Washington D.C." className="image" width="330" height="260" onClick={this.showListings.bind(this, 'Washington')}/>
              <div className="middle">
                  <div className="text">
                    Washington D.C.
                  </div>
                </div></div>
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="listings-header"><strong>Listing</strong></div>
                <div className="header"><strong>Neighborhood</strong></div>
                <div className="header"><strong>Average Review Scores Rating</strong></div>
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