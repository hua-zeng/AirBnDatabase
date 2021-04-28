import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is the basic constructor before every page
export default class About extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="About">
				<PageNavbar active="about" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>
			    <div className="container about-container"> {/* about-container references the first line of About.css (imports it to this page) */}
			    	<div className="jumbotron">
			    		<div className="h5">About the development team</div>
						<p>AirBnDatabase is a collaborative project developed by Hua Zeng, Katie Pizziketti, Michelle Geng, and Sidney Pho.</p>
						<table><tbody>
							<tr><td> {/* <tr> is table row and <td> is table cell */}						
							<div style={{padding: 50, width: 400}}>
							<img class="Hua" src="https://media-exp1.licdn.com/dms/image/C5103AQFuQ9kiSkFNdA/profile-displayphoto-shrink_800_800/0/1516695466992?e=1625097600&v=beta&t=mLIt36_qcLIlQ3oMd1HNxUCCLW982gEiceTN6PKHPu4" alt="Hua Zeng" height="300"></img>
						<br></br>Hua Zeng is a mathematical genius with a strong intuition for software engineering and unparalleled work ethic. 
						<br></br>
						<a href="https://www.linkedin.com/in/huazeng13/">Hua on LinkedIn</a>
						</div>
						</td><td>
						<div style={{padding: 50, width: 450}}> {/* style get to create options of what it looks like, here creating more padding/space */}
						<img class="Katie" src="https://ca.slack-edge.com/TDBS6NQBF-ULN5FAR40-3b615f2ef732-512" alt="Katie Pizziketti" height="300"></img>
						<br></br>Katie Pizziketti is an empathetic community leader with the ability to influence decision makers to change systems. 
						<br></br>
						<a href="https://www.linkedin.com/in/katie-pizziketti/">Katie on LinkedIn</a>
						</div>
						</td></tr>
						
							<tr>
								<td>
							<div style={{padding: 50, width: 400}}>
						<img class="Michelle" src="https://ca.slack-edge.com/TDBS6NQBF-UF6EJ1WNB-a53ecfa94d9d-512" alt="Michelle Geng" height="300"></img>
						<br></br>Michelle Geng is an experienced and enthusiastic project manager with an emphasis on process optimization and efficent use of resources. 
						<br></br>
						<a href="https://www.linkedin.com/in/michellegeng/">Michelle on LinkedIn</a>
						</div>
						</td>
								<td>
								<div style={{padding: 50, width: 420}}>
						<img class="Sidney" src="https://ca.slack-edge.com/TDBS6NQBF-ULCD0T8LA-eba547272368-512" alt="Sidney Pho" height="300"></img>
						<br></br>Sidney is an articulate and experienced software engineer with a knack for teaching and communication.
						<br></br>
						<a href="https://www.linkedin.com/in/sidneypho/">Sidney on LinkedIn</a>
						</div>
									
									</td></tr>
							</tbody></table>
			    		
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}