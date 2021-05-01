import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Covid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';

export default class Covid extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			selectedCity: "Austin",
			dataCovidCancellations: [530, 320, 1340, 200, 258, 426, 777, 1202, 868, 1022, 841, 185],
			dataCovidCases: [83, 81.3333, 78, 97.3704, 81.7857, 65.5185, 96.7407, 94.0741, 71.6538, 44.9259, 68.0769, 77.5]
		}

		this.handleCityChange = this.handleCityChange.bind(this);
		this.submitCity = this.submitCity.bind(this);
	}

	handleCityChange(e) {
		this.setState({
			selectedCity: e.target.value,
		});
		this.submitCity();
	}

	submitCity() {

		fetch("http://localhost:8081/covid/" + this.state.selectedCity, 
		{
		method: 'GET'
		}).then(res => {
		return res.json();
		}, err => {
		console.log(err);
		}).then(dataList => {
		if (!dataList) return;

			const dataCovidCases = [];
			const dataCovidCancellations = [];
		for (const dataObj of dataList) {
			dataCovidCases.push(dataObj.covid_cases);
			dataCovidCancellations.push(dataObj.cancellations);
		}

		this.setState({
			dataCovidCancellations: dataCovidCancellations,
			dataCovidCases: dataCovidCases
		});
		}, err => {
		// Print the error if there is one.
		console.log(err);
		});
	}

	
	render() {
		return (
			<div className="Covid">
				<PageNavbar active="covid" />
				<div style={{backgroundColor: 'white', minHeight:1000}}>
			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">COVID</div>
						<p>Examine trends in Airbnb cancellations per month based on reviews (i.e. had keywords "cancel" or "COVID" in it) in the selected city. Also has information on average hospitalization rates due to COVID for that month. 
						</p>
			    		<br></br>
			    		<div className="input-container">
						<select value={this.state.selectedCity} onChange={this.handleCityChange}>
							<option value="Austin">Austin</option>
							<option value="San Francisco">San Francisco</option>
							<option value="Washington">Washington</option>
						</select>			    			
			    		</div>
			    		<div className="results-container" id="results">
						<Line data={{
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [
			  {
				label: 'Cancellations',
				data: this.state.dataCovidCancellations,
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(0,0,0)',
			  },
			  {
				label: 'Average COVID hospitalizations',
				data: this.state.dataCovidCases,
				fill: true,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			  },
			],
		  }} options={{
								scales: {
								yAxes: [
									{
									ticks: {
										beginAtZero: true,
									},
									},
								],
								},
							}}/>
			    		</div>
			    	</div>
			    </div>
		    </div>
			</div>
		);
	}
}