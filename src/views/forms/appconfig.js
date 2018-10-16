import React, { Component } from 'react';
import {Col , Row, Card, CardBody, CardFooter, Button, FormGroup , Label, Input} from 'reactstrap';

class AppConfig extends Component{
	render(){
		return(
			<Row>
				<Col xs="12">
					<Card>
	              		<CardBody>
              				<FormGroup row>
			                    <Col md="3">
		                      		<Label>Choose Sections : </Label>
			                    </Col>
			                    <Col md="9">
			                      	<FormGroup check inline>
				                        <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
				                        <Label className="form-check-label" check htmlFor="inline-checkbox1">Inbox</Label>
			                      	</FormGroup>
		                      		<FormGroup check inline>
			                        	<Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
				                        <Label className="form-check-label" check htmlFor="inline-checkbox2">Maps</Label>
		                      		</FormGroup>
			                      	<FormGroup check inline>
				                        <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
				                        <Label className="form-check-label" check htmlFor="inline-checkbox3">Analytics</Label>
			                      	</FormGroup>
			                      	<FormGroup check inline>
				                        <Input className="form-check-input" type="checkbox" id="inline-checkbox4" name="inline-checkbox3" value="option3" />
				                        <Label className="form-check-label" check htmlFor="inline-checkbox4">Surveys</Label>
			                      	</FormGroup>
			                    </Col>
		                  	</FormGroup>
	              		</CardBody>
	              		<CardFooter className='text-center'>
			                <Button className='mr-3' type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Save and Continue</Button>
			                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban "></i> Reset</Button>
		              	</CardFooter>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default AppConfig;