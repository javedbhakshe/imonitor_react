import React,{Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ServicesModal extends Component{

 	constructor(props) {
	    super(props);
	    this.state = {
	      modal: false,
	      title:'',
	      desc:''
	    };
	    /*  */ 
	    const community = JSON.parse(localStorage.getItem('community')),
	    	uuid = community.community.uuid,
	    	aLanguageList = community.uuidLocales[uuid];

    	// this.aLanguageList = aLanguageList;
	    /*  */
	    this.toggle = this.toggle.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);


	    /*  */
	    this.aLanuageTabs = aLanguageList.map((ele,ind) => {
	    	return (
	    		<li className="nav-item" key={ind}>
	    			<a className={`nav-link ${ind == 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab_${ele.locale}`}>{ele.displayName}</a>
	    		</li>
    		);
	    });

	    this.aLanguageList = aLanguageList.map((ele,ind) => {
	    	return (
	    		<div className={`tab-pane ${ind == 0 ? 'active' : ''}`} id={`tab_${ele.locale}`} key={ind} role="tabpanel">
		    		<div className="form-group">
			            <label htmlFor={`services_name_${ele.locale}`} className="col-form-label">Title:</label>
			            <input type="text" className="form-control" id={`services_name_${ele.locale}`} placeholder="Enter title ..."/>
	         	 	</div>
		          	<div className="form-group">
			            <label htmlFor={`services_desc_${ele.locale}`} className="col-form-label">Description:</label>
			            <textarea className="form-control" id={`services_desc_${ele.locale}`} placeholder="Enter desription ..."/>
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

  	handleSubmit(){
  		this.props.getFormData({title:this.state.title,desc:this.state.desc});
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
				<button className="btn btn-primary" onClick={this.toggle}>Add Services</button>
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
				          	<button type="submit" onClick = {this.toggle} className="mt-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
				        </form>
		          	</ModalBody>
		        </Modal>
			</div>
		);
	}

}

export default ServicesModal;