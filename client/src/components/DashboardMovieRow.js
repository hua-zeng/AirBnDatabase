import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="listing">
				<div className="listing_id">{this.props.listing_id}</div>
				<div className="listing_name">{this.props.listing_name}</div>
				<div className="city_name">{this.props.city_name}</div>
				<div className="neighborhood">{this.props.neighborhood}</div>
				<div className="avg_review_scores_rating">{this.props.avg_review_scores_rating}</div>
				<div className="number_of_reviews">{this.props.number_of_reviews}</div>
			</div>
		);
	}
}
