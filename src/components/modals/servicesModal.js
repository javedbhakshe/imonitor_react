import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ServicesModal extends Component{

 	constructor(props) {
	    super(props);
	    this.state = {
	      modal: false,
	      title:'',
		  desc:'',
		  formErrors: {title: '', description: ''},    
		  titleValid: false,
		  formValid: false,  
	    };
	    /*  */ 
	    const community = JSON.parse(localStorage.getItem('community')),
	    	uuid = community.community.uuid,
	    	aLanguageList = community.uuidLocales[uuid];

    	// this.aLanguageList = aLanguageList;
		/*  */
		
		this.item = {};
		this.toggle = this.toggle.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);


	    /*  */
	    this.aLanuageTabs = aLanguageList.map((ele,ind) => {
	    	return (
	    		<li className="nav-item" key={ind}>
	    			<a className={`nav-link ${ind == 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab-${ind}`}>{ele.displayName}</a>
	    		</li>
    		);
	    });

	    this.aLanguageList = aLanguageList.map((ele,ind) => {
	    	return (
	    		<div className={`tab-pane ${ind == 0 ? 'active' : ''}`} id={`tab-${ind}`} key={ind} role="tabpanel">
		    		<div className="form-group">
			            <label htmlFor={`services_name_${ele.locale}`} className="col-form-label">Name:</label>
			            <input type="text" className={"form-control "+ (ele.locale == 'en_US' ? this.errorClass(this.state.formErrors.title) : '')} id={`name-${ele.locale}`} name="name" data-lang={ele.locale} onChange={this.handleUserInput}	 placeholder="Enter title ..."/>
						<em className="error invalid-feedback">{this.state.formErrors.title}</em>
					  </div>
		          	<div className="form-group">
			            <label htmlFor={`services_desc_${ele.locale}`} className="col-form-label">Description:</label>
			            <textarea className="form-control" name="description" id={`description-${ele.locale}`} data-lang={ele.locale} onChange={this.handleUserInput} placeholder="Enter desription ..."/>
		          	</div>
	          	</div>
    		);
	    })

	    /*  */
  	}

  	toggle() {		
	    this.setState({
	      modal: !this.state.modal
	    });
	  }
	  
	handleUserInput = (e) => {
		let lang = e.target.dataset["lang"];		
		if(!this.item[lang]){
			this.item[lang]={}
		}		
        const name = e.target.name;
		const value = e.target.value;
		const id = e.target.id;
		this.validateField(id, value)

		this.item[lang][name] = value;
	
	}

	validateField(fieldID, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
       
        switch(fieldID) {
            case 'name-en_US':
                titleValid = value.length >= 1;
                fieldValidationErrors.title = titleValid ? '' : 'English Title Should not empty';
                break;
          
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
			titleValid: titleValid,
			formValid: titleValid
          });
	}
	
	errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
    }


  	handleSubmit(e){
		e.preventDefault();	
		  this.props.getFormData(this.item);
		  this.item = {};	
		  this.setState({ formValid: false});
		  
  	}

  	handleChange(e){
  		const sVal = e.target.value;
  		if(e.target.id === 'services-name'){
  			this.setState({title:sVal});
  		}else{
  			this.setState({desc:sVal});
  		}
  	} 


	render(){
		return(
			<div>
				<button className="btn btn-primary" onClick={this.toggle}>Add Services </button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
		          	<ModalHeader toggle={this.toggle}>Service</ModalHeader>
	          		<ModalBody>
	          		  	<form onSubmit={this.handleSubmit}>
				          	<ul className="nav nav-tabs" role="tablist">
								{this.aLanuageTabs}
							</ul>
							<div className="tab-content">
								{this.aLanguageList}
							</div>
				          	<button type="submit" disabled={!this.state.formValid} onClick = {this.toggle} className="mt-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
							</form>
							
		          	</ModalBody>
		        </Modal>
			</div>
		);
	}

}

export default ServicesModal;