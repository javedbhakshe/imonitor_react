import React, { Component } from 'react';

class QuestionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {           
            formErrors: {title: '', type:''},    
            titleValid: false,
            typeValid:false,
            formValid: false,  
            showNomial: false
          };

        this.nominal = [];
        this.item = {};		
		this.handleUserInput = this.handleUserInput.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);	   

        const community = JSON.parse(localStorage.getItem('community')),
	    	uuid = community.community.uuid,
            aLanguageList = community.uuidLocales[uuid];
            
        this.aLanguageList = aLanguageList;
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.getQuestionData(this.item);
        this.item = {};	
        this.setState({ formValid: false});
        document.getElementById('addServices').reset();
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
        
        
        if(name == 'type'){
            var nominalVal = false;
            if((value == 'Dropdown' || value == 'Radio' || value == 'Checkbox')){
                nominalVal = true;    
            }        
            this.setState({
                showNomial: nominalVal
            });  
        }
        
	
	}

    validateField(fieldID, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let typeValid = this.state.typeValid;
       
        switch(fieldID) {
            case 'name-en_US':
                titleValid = value.length >= 1;
                fieldValidationErrors.title = titleValid ? '' : 'English Title Should not empty';
                break;
          
            case 'type-en_US':
                typeValid = value.length >= 1;
                fieldValidationErrors.type = typeValid ? '' : 'Type Should not empty';
                break;

            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            titleValid: titleValid,
            typeValid:typeValid			
          }, this.validateForm);
	}
	
	errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    validateForm() {
        this.setState({formValid: this.state.titleValid && this.state.typeValid});
    }

    render(){
        let that = this;	
        return(
            
            <div className="card">
            {/* <div className="card-header">
            <i className="icon-note"></i> Masked Input Plugin for jQuery
           
            </div> */}
            <form id="addServices" onSubmit={this.handleSubmit}>
            <div className="card-body">
            
            <ul className="nav nav-tabs" role="tablist">
                {
                    this.aLanguageList.map((ele,ind) => {
                        return (
                            <li className="nav-item" key={ind}>
                                <a className={`nav-link ${ind == 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab_${ele.locale}`}>{ele.displayName}</a>
                            </li>
                        );
                    })
                }
            </ul>
            <div className="tab-content">
                {
                    this.aLanguageList.map((ele,ind) => {
                        return (
                            <div className={`questionTab tab-pane ${ind == 0 ? 'active' : ''}`} id={`tab_${ele.locale}`} key={ind} role="tabpanel">
                                <fieldset className="form-group">
                                    <label>Attribute Name</label>
                                    <div className="input-group">
                                        <span className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </span>
                                        <input type="text" className={"form-control "+ (ele.locale == 'en_US' ? that.errorClass(that.state.formErrors.title) : '')} id={`name-${ele.locale}`} name="name" data-lang={ele.locale} onChange={this.handleUserInput}	 placeholder="Enter title ..."/>
                                        <em className="error invalid-feedback">{that.state.formErrors.title}</em>
                                    </div>                
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Attribute Type</label>
                                    <div className="input-group">
                                        <span className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-list"></i>
                                            </span>
                                        </span>
                                        <select className={"form-control "+ (ele.locale == 'en_US' ? that.errorClass(that.state.formErrors.type) : '')} name="type" id={`type-${ele.locale}`} data-lang={ele.locale} onChange={that.handleUserInput} >
                                            <option value="">Please Select Type</option>
                                            <option value="Text">Text</option>
                                            <option value="Number">Number</option>
                                            <option value="Date">Date</option>
                                            <option value="Dropdown">Dropdown</option>
                                            <option value="Radio">Radio</option>
                                            <option value="Checkbox">Checkbox</option>                       
                                        </select>
                                        <em className="error invalid-feedback">{that.state.formErrors.type}</em>
                                        {/* <input className="form-control" id="type" type="text" /> */}
                                    </div>            
                                </fieldset>
                                <fieldset className="form-group" style={{ display: this.state.showNomial ? 'block': 'none'}}>
                                    <label>Nominals(coma seperated) </label>
                                    <div className="input-group">
                                        <span className="input-group-prepend">
                                        <span className="input-group-text">
                                                <i className="fa fa-bars"></i>
                                            </span>
                                        </span>
                                        <textarea className="form-control" id="nominal" name="nominal" data-lang={ele.locale} onChange={that.handleUserInput} ></textarea>
                                    </div>                
                                </fieldset>         
                              </div>
                        );
                    })
                }
            </div>                    
           <div className="text-center card-footer">
                <button type="submit" className="mr-3 btn btn-primary btn-sm" disabled={!this.state.formValid}><i className="fa fa-plus"></i> Add </button>
                {/* <button type="button" className="btn btn-danger btn-sm" id="closeModel" data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button> */}
            </div>
            </div>
            
            </form>
            </div>
           
        )
    }
}

export default QuestionForm;