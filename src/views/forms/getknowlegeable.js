import React, { Component } from 'react';
import {Col, Row, Card, CardBody, CardFooter, FormGroup, Button,Label, Input } from 'reactstrap';
class GetKnowlegeable extends Component{
	render(){
		return(
			<Row>
				<Col sm='12'>
					<Card>	
						<CardBody>
							<FormGroup row>
			                    <Col xs="2">
		                      		<Label htmlFor="selectSm">Enter Heading</Label>
			                    </Col>
			                    <Col xs="4" >
			                      	<Input type="select" name="selectSm" id="SelectLm" bsSize="sm" disabled>
				                       
				                        <option value="1">Text</option>
				                        <option value="2">Image</option>
				                        <option value="3">Video</option>
			                      	</Input>
			                    </Col>
			                    <Col xs="4">
			                    	<Input type="text" id="input-normal" name="input-normal" placeholder="Enter Heading" />
		                  		</Col>
		                  	</FormGroup>
		                  	<FormGroup row>
			                    <Col xs="2">
		                      		<Label htmlFor="selectSm1">Enter Subtitle</Label>
			                    </Col>
			                    <Col xs="4" >
			                      	<Input type="select" name="selectSm1" id="SelectLm1" bsSize="sm" disabled>
				                       
				                        <option value="1">Text</option>
				                        <option value="2">Image</option>
				                        <option value="3">Video</option>
			                      	</Input>
			                    </Col>
			                    <Col xs="4">
			                    	<Input type="text" id="input-heading" name="input-normal" placeholder="Enter Subtitle" />
		                  		</Col>
		                  	</FormGroup>
		                  	<FormGroup row>
			                    <Col xs="2">
		                      		<Label htmlFor="selectSm2">Enter Content</Label>
			                    </Col>
			                    <Col xs="4" >
			                      	<Input type="select" name="selectSm2" id="SelectLm2" bsSize="sm">
				                       
				                        <option value="0">Please select</option>
				                        <option value="1">Text</option>
				                        <option value="2">Image</option>
				                        <option value="3">Video</option>
			                      	</Input>
			                    </Col>
			                    <Col xs="4">
			                    	<Input type="text" id="input-content" name="input-normal" placeholder="Enter Content" />
		                  		</Col>
		                  	</FormGroup>
		                  	<Col sm="4" md="2" xl className="mb-3 mb-xl-0">
				                <Button block color="info">Add</Button>
			              	</Col>
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

export default GetKnowlegeable;