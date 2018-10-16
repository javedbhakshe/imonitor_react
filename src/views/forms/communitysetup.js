import React, { Component } from 'react';
import {
  Button,
  /*Badge,
  ButtonDropdown,*/
  Card,
  CardBody,
  CardFooter,
  /*CardHeader,*/
  Col,
  /*Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,*/
  FormGroup,
 /* Fade,
  Form,
  FormText,
  FormFeedback,*/
  Input,
  /*InputGroup,
  InputGroupAddon,
  InputGroupText,*/
  Label,
  Row,
} from 'reactstrap';
class CommunitySetUp extends Component{
	render(){
		return(
			<Row>
				<Col xs="12">
		            <Card>
		              	<CardBody>
							<FormGroup row className="my-0">
				                <Col sm='6'>
					                <FormGroup>
				                  		<Label htmlFor="community">Community Name</Label>
				                  		<Input type="text" id="community" placeholder="Enter your community name" />
					                </FormGroup>
			                 	</Col>
				                <Col sm='6'>
					                <FormGroup>
			                      		<Label htmlFor="commtype">Community Type</Label>
				                      	<Input type="select" name="commtype" id="commtype">
					                        <option value="Health">Health</option>
					                        <option value="Education">Education</option>
					                        <option value="Social">Social</option>
				                      	</Input>
				                    </FormGroup>
				                </Col>
								<Col sm='6'>
					                <FormGroup>
			                  			<Label htmlFor="street">Street</Label>
				                  		<Input type="text" id="street" placeholder="Enter street name" />
					                </FormGroup>
								</Col>			                
			                  	<Col xs="6">
				                    <FormGroup>
			                      		<Label htmlFor="city">City</Label>
			                      		<Input type="text" id="city" placeholder="Enter your city" />
				                    </FormGroup>
			                  	</Col>
			                  	<Col xs="4">
				                    <FormGroup>
			                      		<Label htmlFor="postal-code">Postal Code</Label>
			                      		<Input type="text" id="postal-code" placeholder="Postal Code" />
				                    </FormGroup>
			                  	</Col>
								<Col xs="4">
					                <FormGroup>
					                  	<Label htmlFor="country">Country</Label>
				                 	 	<Input type="text" id="country" placeholder="Country name" />
					                </FormGroup>
								</Col>
							</FormGroup>
							<FormGroup>
			                    <Col sm="12">
			                      	<Label htmlFor="file-input">Logo</Label>
			                      	<Input type="file" id="file-input" name="file-input" />
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

export default CommunitySetUp;