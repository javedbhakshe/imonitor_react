import React,{Component} from 'react';
import ServicesModal from '../../components/modals/servicesModal';
/*import { Card, CardBody, CardHeader } from 'reactstrap';*/
import ListGroup from '../../components/custom/ListGroup';


class Services extends Component{

	state = {
		services:[]
	}

	addService = (p_oData,p_type) => {
		console.log(p_oData);
		
		let oService = p_oData['en_US'];
		oService.questions = [];
		oService.linked = p_type.value === 'Linked'; 

		this.setState( prevState => {
			let aPrev = prevState.services;
			aPrev.push(oService);
			return {
				services:aPrev
			}
		});
	}

	onListItemDelete = (p_index) =>{
		console.log(p_index);
		this.setState( prevState => {
			let aPrev = prevState.services;
			aPrev.splice(p_index,1);
			return {
				services:aPrev
			}
		});
	}

	onListItemEdit = (p_index) => {
		console.log(p_index);
		this.refs.Modal.toggle();
	}

	render(){
		return(
			<div>
				<div className="row">
		          	<div className="col-12">
			            <ServicesModal 
		            		ref="Modal"
			            	getFormData = {this.addService}
		            	/>
		          	</div>

		          	<div className='col-sm-12 col-md-4 col-lg-4'>
		          		{this.state.services.length ? 
		          			<ListGroup name="Services"
		          				listItems = {this.state.services}
		          				onDelete = {this.onListItemDelete}
		          				onEdit = {this.onListItemEdit}
		          			/> : 
	          				null
	          			}
		          	</div>
	        	</div>
			</div>
		);
	}
}

export default Services;