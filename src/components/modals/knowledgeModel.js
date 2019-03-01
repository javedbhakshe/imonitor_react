import React,{Component} from 'react';
import { connect } from 'react-redux';
import { apiServices } from '../../services/apiServices';
import { knowledgeData } from '../../actions';

class KnowledgeModal extends Component{

    state = {
        languageList: [],
        formErrors: {title: '', description: ''},    
        titleValid: false,
        formValid: false,     
        item : {}
    };

    handleUserInput = (e) => {
		let lang = e.target.dataset["lang"];		
		if(!this.state.item[lang]){
			this.state.item[lang]={}
		}		
        const name = e.target.name;
		const value = e.target.value;
		const id = e.target.id;
		this.validateField(id, value)

		this.state.item[lang][name] = value;
	
	}

	fileChangedHandler = (e) => {

		let lang = e.target.dataset["lang"];
		if(!this.state.item[lang]){
			this.state.item[lang]={}
		}	

		const name = e.target.name;
		const file = e.target.files[0];		
		
		apiServices.cloudinaryUpload(file).then(function(response){
			if(response.url){				
				this.state.item[lang][name] = response.url;
				this.setState({reload : true });
			}       
		});
	}

	validateField = (fieldID, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
       
        switch(fieldID) {
            case 'title-en_US':
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
	
	errorClass = (error) => {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    addItems = (e) =>{
		e.preventDefault();	
		this.props.knowledgeData(this.state.item);
		document.getElementById("closeModel").click();	
		document.getElementById('addItems').reset();
    }

    render(){

        let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);
		let uuid = community.community.uuid;
        let languageList = community.uuidLocales[uuid] ? community.uuidLocales[uuid] : [];
        this.state.languageList = languageList;
        
        return (
            <div className="modal-content">
					 	
					   <form id="addItems" onSubmit={this.addItems}>						
						<div className="card-body">	
							<ul className="nav nav-tabs" role="tablist">
								{
									this.state.languageList.map((item, index) => {
										return (
										<li className="nav-item" key={index}>
											<a className={"nav-link " + (index == 0 ? 'active' : '')} id={'tab-'+item.locale} data-toggle="tab" href={`#${item.locale}`} role="tab" aria-controls={item.locale}>{item.displayName}</a>
										</li>
										)
									})
								}	
							</ul>	
							<div className="tab-content">
								{								
								this.state.languageList.map((value, index) => {
									return (
										<div className={"tab-pane " + (index == 0 ? 'active' : '')} key={index} id={value.locale} role="tabpanel">
											<div className="form-group">
												<label className="control-label">Title</label>
												<input className={"form-control "+ (value.locale == 'en_US' ? this.errorClass(this.state.formErrors.title) : '')} name="title" id={'title-'+value.locale} type="text" data-lang={value.locale}											
													onChange={this.handleUserInput}
													placeholder="Enter a title ..." />
													<em className="error invalid-feedback">{this.state.formErrors.title}</em>
											</div>
											<div className="form-group">
												<label className="control-label" >Description</label>
												<textarea className="form-control" name="description" id={'description-'+value.locale}  rows="6" 								
												placeholder="Enter a description ..." data-lang={value.locale}
												onChange={this.handleUserInput}></textarea>
											</div>	
											<div className="row">
											<div className="col-lg-3">
											<div className="form-group">
												<label>Cover Image</label>
												<input type="file" name="coverUrl" data-lang={value.locale} className="communityLogo_fileupload form-control-file" accept=".jpg, .jpeg, .png"
													onChange={this.fileChangedHandler}/>
											</div>	
											</div>
											<div className="col-lg-2 logoThumbnails text-right">
												<img src={(this.state.item[value.locale] && this.state.item[value.locale].coverUrl ? this.state.item[value.locale].coverUrl : "../../assets/images/no-image.png")} className="img-responsive noImage"
												onError={(e) => {
													e.target.src = require("../../assets/images/no-image.png") // default image
												}}
												/>
											</div>
											<div className="col-lg-7">
											<div className="form-group">
												<label className="control-label">Video Url</label>
												<input className="form-control" name="video" id={'video-'+value.locale}  type="text" data-lang={value.locale}											
													onChange={this.handleUserInput}
													placeholder="Enter a title ..." />
											</div>	
											</div>
											</div>
																
										</div>								
									)
								})
								}					
							</div>	
						</div>
						<div className="text-center card-footer">
							<button type="submit" disabled={!this.state.formValid} className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
							<button type="button" className="btn btn-danger btn-sm" id="closeModel" data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
						</div>
						</form>					
					</div>
        )
    }
}

export default connect(
	null,
	{ knowledgeData }
  )(KnowledgeModal);