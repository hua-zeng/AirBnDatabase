import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Location.css';



export default class BestLocationRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="location">
                <a href={this.props.url} target="_blank">
				<div className="listing_name">{this.props.listing_name}</div>
                </a>
				<div className="neighborhood">{this.props.neighborhood}</div>
                <div className="rating">{this.props.rating}</div>
				<div className="price">{this.props.price}</div>
			</div>
		);
	}
}
