import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import Select from 'react-select';
import {aServiceType}  from '../../data/config';

class ServicesModal extends Component{

 	constructor(props) {
	    super(props);
	    /*this.state = {
	      	modal: false,
	      	bEdit:false,
		  	serviceType:aServiceType[0],
		  	formErrors: {title: '', description: ''},    
		  	titleValid: false,
		  	formValid: false,
		  	data:{}  
	    };*/

	    const community = JSON.parse(localStorage.getItem('community')),
	    	uuid = community.community.uuid,
	    	aLanguageList = community.uuidLocales[uuid] ? community.uuidLocales[uuid] : [];

		for(let i in aLanguageList){
			if(aLanguageList[i].locale === 'en_US'){
				let oEle = aLanguageList.splice(i,1)[0];
				aLanguageList.unshift(oEle);
				break;
			}
		}

		this.aLanguageList = aLanguageList; 
		this.intializeModalState();
  	}

  	intializeModalState = (p_isSet) => {
  		let oTemp = {};
  		for(let i in this.aLanguageList){
            let sProp = this.aLanguageList[i].locale;
            oTemp[sProp] = {name:'','linked-service':'',description:''};
        }
        if(p_isSet){
        	this.setState ({
        		modal: false,
		      	bEdit:false,
			  	serviceType:aServiceType[0],
			  	formErrors: {title: '', description: ''},    
			  	titleValid: false,
			  	formValid: false,
			  	data:oTemp
        	});
        }else{
	        this.state = {
	        	modal: false,
		      	bEdit:false,
			  	serviceType:aServiceType[0],
			  	formErrors: {title: '', description: ''},    
			  	titleValid: false,
			  	formValid: false,
			  	data:oTemp
	        };
        }
  	}

  	getTabList = () => {
	    return this.aLanguageList.map((ele,ind) => {
	    	return (
	    		<li className="nav-item" key={ind}>
	    			<a className={`nav-link ${ind === 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#module_tab_${ind}`}>{ele.displayName}</a>
	    		</li>
    		);
	    });
  	}

  	getTabConents = () => {
  		return this.aLanguageList.map((ele,ind) => {
	    	return (
	    		<div className={`tab-pane ${ind === 0 ? 'active' : ''}`} id={`module_tab_${ind}`} key={ind} role="tabpanel">
		    		<div className="form-group">
			            <label htmlFor={`services_name_${ele.locale}`} className="col-form-label">Name:</label>
			            <input type="text" 
			            	className={"form-control "+ (ele.locale === 'en_US' ? this.errorClass(this.state.formErrors.title) : '')} 
			            	id={`name-${ele.locale}`} name="name" data-lang={ele.locale} 
			            	onChange={this.handleUserInput}	 
			            	placeholder="Enter title ..."
			            	value = {this.state.data[ele.locale]['name']}
		            	/>
						<em className="error invalid-feedback">{this.state.formErrors.title}</em>
				  	</div>
		          	<div className="form-group">
			            <label htmlFor={`services_desc_${ele.locale}`} className="col-form-label">Description:</label>
			            <textarea className="form-control" name="description" 
			            	id={`description-${ele.locale}`} 
			            	data-lang={ele.locale} 
			            	onChange={this.handleUserInput} placeholder="Enter desription ..."
			            	value={this.state.data[ele.locale]['description']}
		            	/>
		          	</div>
		          	{
		          		this.state.serviceType.value === 'Linked' && 
		          		<div className="form-group">
				            <label htmlFor={`linked_service_${ele.locale}`} className="col-form-label">Linked service(s) (Comma separated) : </label>
			            	<input type="text" className="form-control" 
				            	id={`linked_service_${ele.locale}`} name="linked-service" 
				            	data-lang={ele.locale} placeholder="Enter Service(s) ..."
			            		onChange={this.handleUserInput}
			            		value={this.state.data[ele.locale]['linked-service']}
			            	/>
		          		</div>
		          	}
	          	</div>
    		);
	    })
  	}

  	toggle = () => {		
	    this.setState({
	      	modal: !this.state.modal
	    });
  	}

  	onClose = () =>{
  		this.toggle();
  		this.setState({
  			bEdit:false
  		})
  	}

  	onListEdit = (p_data) => {
	    let {data,serviceType} = p_data;
	    console.log(data);
	    this.setState({
	    	data:data,
	    	serviceType : serviceType,
	      	modal: !this.state.modal,
	      	bEdit:true
	    });
  	}	
	  
	handleUserInput = (e) => {
		
		let {name,id,value} = e.target,
			{lang} = e.target.dataset;

		
		this.validateField(id, value)

		this.setState(prevState => {
			let {data} = prevState;
			data[lang][name] = value;
			return {data}
		});
	
	}

	validateField = (fieldID, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
       
        switch(fieldID) {
            case 'name-en_US':
                titleValid = value.length >= 1;
                fieldValidationErrors.title = titleValid ? '' : 'English Title Should not be empty';
                break;
          
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
			titleValid: titleValid,
			formValid: titleValid
      	});
	}
	
	errorClass = (error) => {
        return(error.length === 0 ? '' : 'is-invalid');
    }


  	handleSubmit = (e) => {
		e.preventDefault();	
		let {bEdit} = this.state,
			oCurrent = Object.assign({}, this.state.data);

		if(bEdit){
	  		this.props.editservicedata(oCurrent,this.state.serviceType);
		}else{
			this.props.addServicedata(oCurrent,this.state.serviceType);
		}	
	  	this.intializeModalState(true);
  	}

  	handleDDChange = (selectedOption,e) =>{
  		let sName = e.name;
	    this.setState({ [sName]:selectedOption });
  	}

  	onModalOpen = () =>{
  		this.setState({
			serviceType:aServiceType[0]
  		})
  	}

  	onModalClose = () =>{
  		this.intializeModalState(true);
  	}


	render(){
		return(
			<div className="mb-2">
			 	<Button className="btn btn-light survey-btn" color="primary" onClick={this.toggle}>Add Services</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg" onOpened={this.onModalOpen} 
						onClosed = {this.onModalClose}
						>
		          	<ModalHeader toggle={this.onClose}>Service</ModalHeader>
	          		<ModalBody>
	          			<label className="control-label">Service Type : </label>
	          			<Select
	          				className='mb-2'
					        name="serviceType"
					        options={aServiceType}
					        defaultValue = {aServiceType[0]}
					        onChange={this.handleDDChange}
					        value={this.state.serviceType}
					        isDisabled = {this.state.bEdit}
				      	/>
				      	<label className="control-label">Service Details : </label>
	          		  	<form onSubmit={this.handleSubmit}>
				          	<ul className="nav nav-tabs" role="tablist">
								{this.getTabList()}
							</ul>
							<div className="tab-content">
								{this.getTabConents()}
							</div>
				          	<button type="submit" disabled={!this.state.formValid} className="mt-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
						</form>
							
		          	</ModalBody>
		        </Modal>
			</div>
		);
	}

}

export default ServicesModal;