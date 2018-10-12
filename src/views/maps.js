import React,{Component} from 'react';
import { Card, CardBody,CardHeader } from 'reactstrap';
import Map from '../components/maps/map';
class Maps extends Component{

  	/*componentDidMount() {
  		console.log('sscomponentWillUnmount');
  	}

  	componentWillUnmount() {
  		console.log('componentWillUnmount');
  	}*/

	render(){
		return(
			<div className='container-fluid my-4'>
				<div className='row'>
					<div className='col-sm-12'>
		              	<Card>
			                <CardHeader>Google Maps</CardHeader>
			                <CardBody className='m-0 p-0'>
			                  	<div className="chart-wrapper map-holder">
			                    	<Map />
			                  	</div>
			                </CardBody>
		              	</Card>
						
					</div>

				</div>
			</div>
		);
	}
}

export default Maps;