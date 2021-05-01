import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Listings.css';
​
export default class ListingsRow extends React.Component {
	constructor(props) {
		super(props);
	}
​
	render() {
		return (
			<div className="listingsResults">
                <div className="zipcode">{this.props.zipcode}</div>
				<a href={this.props.url} target="_blank">
				<div className="listing_name">{this.props.name}</div>
                </a>
				<div className="neighborhood">{this.props.neighborhood}</div>
				<div className="amenities">{this.props.amenities}</div>
			</div>
		);
	}
}
