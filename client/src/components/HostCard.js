import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/HostCard.css';
export default class HostCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <div className="card">
                <div className="image">
                <a href={this.props.url} target="_blank">
                    <img src={this.props.picture} alt="Host Picture" style={{width:'30%'}}/>
                </a>
                </div>
                <div className="container">
                    <div className="name"><h4>{this.props.host_name}</h4></div>
                    <div className="about"><p>{this.props.about}</p></div>
                    <div><strong>Number of Cities: {this.props.num_cities}</strong></div>
                    <div><strong>Number of Listings: {this.props.num_listings}</strong></div>
                </div>
            </div>
		);
	}
}
