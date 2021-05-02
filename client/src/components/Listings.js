import React from 'react';
import PageNavbar from './PageNavbar';
import ListingsRow from './ListingsRow';
import '../style/Listings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Use Homework 2 to figure out how to create the drop-down, create pseudo coding

export default class Listings extends React.Component {
	constructor(props) {
		super(props);

		// should not prepopulate but am doing so to test
		this.state = { 
			writtenAmenities: "",
			writtenZipcode: "", // should this be string or int?
			listingsKey: []
		}
		this.handleWrittenAmenitiesChange = this.handleWrittenAmenitiesChange.bind(this);
		this.handleWrittenZipcodeChange = this.handleWrittenZipcodeChange.bind(this);
		this.submitListings = this.submitListings.bind(this);
	}

	
	handleWrittenAmenitiesChange(e) {
		this.setState({
			writtenAmenities: e.target.value
		});
	}
	
	handleWrittenZipcodeChange(e) {
		this.setState({
			writtenZipcode: e.target.value
		});
	}

	submitListings() {
		fetch("http://localhost:8081/listings/" + this.state.writtenZipcode +"/"+this.state.writtenAmenities,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(listingsList => {
      if (!listingsList) return;
      let listingDivs = listingsList.map((listingsObj, i) =>
	
	  // DO I NEED TO ADD key={i} here? I don't think so because reviews doesn't but location does
      <ListingsRow zipcode={listingsObj.zipcode} url = {listingsObj.url} name={listingsObj.name} neighborhood={listingsObj.neighborhood} amenities={listingsObj.amenities} />
      );

      this.setState({
		listingsKey: listingDivs
	  });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	}

	
	render() {
		return (
			// do I need to change the reviews name for the dividers?
			<div className="Listings">
				<PageNavbar active="Listings" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>
			    <div className="container reviews-container">
			    	<div className="jumbotron">
			    		<div className="h5">LISTINGS</div>
						<p>Please type in zipcode and <b>one</b> amenity to search for available listings that match the criteria.</p>
			    		<br></br>
						
						<div className="zip-container">
			    		<div className="input-container">
							Please enter zipcode: &nbsp;
							{/* Add back the placeholders. Do I need id and classname for the input tags for writtenAmenities? */}
			    				<input type='text' placeholder="94117" value={this.state.writtenZipcode} onChange={this.handleWrittenZipcodeChange}  id="listings" className="listings-input"/>
							 	&nbsp; &nbsp; &nbsp; ... and please enter amenity: &nbsp; <input type='text' value={this.state.writtenAmenities} onChange={this.handleWrittenAmenitiesChange} id="listings" className="listings-input"/>
								<button id="submitListingsKeyBtn" className="submit-btn" onClick={this.submitListings}>Submit</button>
			    			
						</div>
					</div>
			    		<div className="header-container">
			    			<div className="headers">
										<div className="header"><strong>Zipcode</strong></div>
										<div className="header"><strong>AirBnB Listing Name</strong></div>
										<div className="header"><strong>Neighborhood</strong></div>
										<div className="header"><strong>Amenities</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.listingsKey}
			    		</div>
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}