import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ReviewsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reviewResults">
				<div className="city">{this.props.city}</div>
				<div className="name">{this.props.name}</div>
				<div className="comment">{this.props.comment}</div>
				<div className="reviewer">{this.props.reviewer}</div>
				<div className="date">{this.props.date}</div>
			</div>
		);
	}
}
