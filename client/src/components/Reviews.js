import React from 'react';
import PageNavbar from './PageNavbar';
import ReviewsRow from './ReviewsRow';
import '../style/Reviews.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Reviews extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected review name,
		// and the list of review returned by searching key words.
		this.state = { 
			reviewKey: "",
			recReviews: []
		}
		this.handleReviewKeyChange = this.handleReviewKeyChange.bind(this);
		this.submitReviewKey = this.submitReviewKey.bind(this);
	}

	handleReviewKeyChange(e) {
		this.setState({
			reviewKey: e.target.value
		});
		
	}

	submitReviewKey() {
		fetch("http://localhost:8081/reviews/" + this.state.reviewKey,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(reviewList => {
      if (!reviewList) return;
      let reviewDivs = reviewList.map((review, i) =>
			
      <ReviewsRow key={i} city={review.city_name} name={review.name} comment={review.comments} reviewer={review.reviewer_name} date={review.date} />

      );
      

      this.setState({
				recReviews: reviewDivs
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
			    <div className="container reviews-container">
			    	<div className="jumbotron">
			    		<div className="h5">REVIEWS</div>
						<p>Return listings information based on keywords searching in reviews.</p>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="keywords to search" value={this.state.reviewKey} onChange={this.handleReviewKeyChange} id="reviewKey" className="review-input"/>
			    			<button id="submitReviewKeyBtn" className="submit-btn" onClick={this.submitReviewKey}>Submit</button>
			    		</div>
			    		<div className="header-container">
			    			<div className="headers">
										<div className="header"><strong>City</strong></div>
										<div className="header"><strong>AirBnB Listing Name</strong></div>
										<div className="header"><strong>Comment</strong></div>
										<div className="header"><strong>Reviewer</strong></div>
										<div className="header"><strong>Date</strong></div>
			    			</div>
			    		</div>
			    		<div className="reviews-container" id="results">
			    			{this.state.recReviews}
			    		</div>
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}