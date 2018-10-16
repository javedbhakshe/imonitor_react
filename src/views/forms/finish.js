import React,{Component} from 'react';
import {Col, Button} from 'reactstrap';

class Finish extends Component{
	render(){
		return(
			<Col sm="2" className="mb-3 mb-xl-0">
                <Button block color="success">Finish</Button>
          	</Col>
		);
	}
}
export default Finish;