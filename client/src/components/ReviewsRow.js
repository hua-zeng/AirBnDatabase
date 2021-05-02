import React from 'react';
import '../style/Reviews.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ReviewsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="reviewResults">
				<div className="reviewer"><h5>{this.props.reviewer}</h5></div>
				<div className="city"><h6>{this.props.city}</h6></div>
				<div className="name">{this.props.name}</div>
				<div className="comment">{this.props.comment}</div>
				<div className="date">{this.props.date}</div>
			</div>
		);
	}
}
