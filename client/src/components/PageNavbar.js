import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['dashboard', 'Listings', 'Host'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			      <span className="navbar-brand center">
					  <h1 style={{color: 'pink', fontSize: 69, margin: 0, fontFamily: 'Georgia'}}>AirBn<span style={{color: 'white'}}>Database</span></h1>

					  </span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {this.state.navDivs}
			        </div>
			      </div>
				  
				  <div><h4 style={{color: 'pink', margin: 1, float: 'none', fontFamily: 'Georgia'}}>Developers:</h4>
				  <p style={{color: 'white', float: 'right'}}>Hua Zeng, Katie Pizziketti, Michelle Geng, Sidney Pho</p></div>
			    </nav>
			</div>
        );
	}
}