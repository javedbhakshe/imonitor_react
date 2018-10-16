import React, { Component } from 'react';
import Map from '../../components/maps/map';
import {Col , Row, Card, CardBody} from 'reactstrap';

class AppConfig extends Component{
	render(){
		return(
			<Row>
				<Col xs="12">
					<Card>
	              		<CardBody className='map-holder m-0 p-0'>
      						<Map />
	              		</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default AppConfig;