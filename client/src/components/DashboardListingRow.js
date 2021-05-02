import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/Dashboard.css';

export default class DashboardListingRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="listing">
				<div className="single_listing_name">{this.props.listing_name}</div>
				<div className="single_listing_name">{this.props.neighborhood}</div>
				<div className="single_listing_name">{this.props.avg_review_scores_rating}</div>
			</div>
		);
	}
}