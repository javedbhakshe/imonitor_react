import React, { Component } from 'react';
import {
  /*Badge,
  Button,
  ButtonDropdown,*/
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  /*Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,*/
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
				                        <option value="District">District</option>
				                        <option value="State">State</option>
				                        <option value="National">National</option>
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
	              		</CardBody>
		            </Card>
	          	</Col>
          	</Row>
		);
	}
}

export default CommunitySetUp;