import React, { Component } from 'react';
import _ from 'lodash';
import { apiServices } from '../../services/apiServices';
import Accordian from '../../components/custom/accordian';
import swal from 'sweetalert';
import Loader from '../../components/loaders/loader';

class GetKnowlegeable extends Component{
	
	constructor(props){
		super(props);	
		
		this.state = {				
			content:[],
			dataObj:[],
			language:[],			
			isLoading:false,
			reload:false,
			formErrors: {title: '', description: ''},    
			titleValid: false,
			formValid: false,       
			editForm: false, 
			level:''		         
		  }
	
		// this.uuid = uuid;
		this.item = {};
		// this.languageList = languageList;
		this.addItems = this.addItems.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.onChildClickAction  = this.onChildClickAction.bind(this);
		this.onContentEditAction  = this.onContentEditAction.bind(this);
		this.onContentDeleteAction  = this.onContentDeleteAction.bind(this);
		this.onContentUpDownAction  = this.onContentUpDownAction.bind(this);
		this.updateAccordian = this.updateAccordian.bind(this);
		this.formSubmit = this.formSubmit.bind(this);		
	}

	componentDidMount(){
		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);
		let communityFAQBOs = community.communityFAQBOs;		
		if(!_.isEmpty(communityFAQBOs)){
			let dataObj = JSON.parse(communityFAQBOs[0].communityPreferences.summary);
			this.state.dataObj =dataObj;
			this.updateAccordian();
		}
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

	fileChangedHandler = (e) => {

		let lang = e.target.dataset["lang"];
		if(!this.item[lang]){
			this.item[lang]={}
		}	

		const name = e.target.name;
		const file = e.target.files[0];
		
		let that = this;
		apiServices.cloudinaryUpload(file).then(function(response){
			if(response.url){
				// that.setState({[name]: response.url});
				that.item[lang][name] = response.url;
				that.setState({reload : true });
			}       
		});
	}

	validateField(fieldID, value) {
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
	
	errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
    }

	addItems(e){
		// console.log(this.state.level);
		e.preventDefault();	
		let levelInx = this.state.level;

		if(this.state.editForm){
			levelInx = this.state.level;
			let LevelInxArr = levelInx.split("-");	
			var levelInx1, levelInx2, levelInx3;
			levelInx1 = LevelInxArr[0];	
			if(LevelInxArr[1]){
				levelInx2 = LevelInxArr[1];	
			}
			if(LevelInxArr[2]){
				levelInx3 = LevelInxArr[2];	
			}

			if(levelInx3){
				this.state.dataObj[levelInx1]['data'][levelInx2]['data'][levelInx3] = this.item;	
			}else if(levelInx2){
				this.state.dataObj[levelInx1]['data'][levelInx2] = this.item;	
			}else{
				this.state.dataObj[levelInx1] = this.item;
			}
			
		}else{
			levelInx = this.state.level;
			if(levelInx == ''){
				this.state.dataObj.push(this.item);
			}else{
				let LevelInxArr = levelInx.split("-");			
				let innerData = this.state.dataObj[LevelInxArr[0]];	
				if(LevelInxArr[1]){
					innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]];	
				}
				if(!innerData['data']){
					innerData['data']=[]
				}
				innerData['data'].push(this.item);
				
			}
		}
		
		
		this.item = {};	
		this.updateAccordian();
		document.getElementById("closeModel").click();	
		document.getElementById('addItems').reset();
		// this.setState({reload : true, level:'' });	
	}

	onChildClickAction(d){		
		this.state.editForm = false;
		this.item = {};	
		this.setState({level:d, editForm:false, formErrors: {title: '', description: ''},    
			titleValid: false,
			formValid: false
		});
		document.getElementById('addItems').reset();
		// document.getElementById("tab-en_US").onclick();
	}
	onContentEditAction(d){
		let that = this;	
		this.setState({level:d, editForm:true});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");			
		let innerData = this.state.dataObj[LevelInxArr[0]];	
		if(LevelInxArr[1]){
			innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]];	
		}
		if(LevelInxArr[2]){
			innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]]['data'][LevelInxArr[2]];	
		}
		this.item = innerData;
		this.languageList.map(function(value, index) {
			
			if(that.item[value.locale] && that.item[value.locale]['title']){
				document.getElementById('title-'+value.locale).value = that.item[value.locale]['title'];
			}
			
			if(that.item[value.locale] && that.item[value.locale]['description']){
				document.getElementById('description-'+value.locale).value = that.item[value.locale]['description'];
			}

			if(that.item[value.locale] && that.item[value.locale]['video']){
				document.getElementById('video-'+value.locale).value = that.item[value.locale]['video'];
			}
		});		
	}

	onContentDeleteAction(d){
		this.setState({level:d});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");	
		var levelInx1, levelInx2, levelInx3;
		levelInx1 = LevelInxArr[0];	
		if(LevelInxArr[1]){
			levelInx2 = LevelInxArr[1];	
		}
		if(LevelInxArr[2]){
			levelInx3 = LevelInxArr[2];	
		}

		if(levelInx3){
			this.state.dataObj[levelInx1]['data'][levelInx2]['data'].splice(levelInx3, 1);	
		}else if(levelInx2){
			this.state.dataObj[levelInx1]['data'].splice(levelInx2, 1);	
		}else{
			this.state.dataObj.splice(levelInx1, 1);
		}			
		this.updateAccordian();

	}

	onContentUpDownAction(d, direction){
		this.setState({level:d});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");	
		var levelInx1, levelInx2, levelInx3;
		levelInx1 = LevelInxArr[0];	
		if(LevelInxArr[1]){
			levelInx2 = LevelInxArr[1];	
		}
		if(LevelInxArr[2]){
			levelInx3 = LevelInxArr[2];	
		}

		if(levelInx3){					
			var newInx;
			let dataArr = this.state.dataObj[levelInx1]['data'][levelInx2]['data'];
			if(direction == 'up' && Number(levelInx3) != 0){
				newInx = Number(levelInx3) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx3];
				dataArr[levelInx3] = temp;
			}
			if(direction == 'down' && Number(levelInx3) != (dataArr.length -1)){
				newInx = Number(levelInx3) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx3];
				dataArr[levelInx3] = temp;
			}
		
		}else if(levelInx2){		
			var newInx;
			let dataArr = this.state.dataObj[levelInx1]['data'];
			if(direction == 'up' && Number(levelInx2) != 0){
				newInx = Number(levelInx2) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx2];
				dataArr[levelInx2] = temp;
			}
			if(direction == 'down' && Number(levelInx2) != (dataArr.length -1)){
				newInx = Number(levelInx2) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx2];
				dataArr[levelInx2] = temp;
			}
			
		}else if(levelInx1){				
			var newInx;
			let dataArr = this.state.dataObj;
			if(direction == 'up' && Number(levelInx1) != 0){
				newInx = Number(levelInx1) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx1];
				dataArr[levelInx1] = temp;
			}
			if(direction == 'down' && Number(levelInx1) != (dataArr.length -1)){
				newInx = Number(levelInx1) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx1];
				dataArr[levelInx1] = temp;
			}
			
		}			
		this.updateAccordian();
	}

	updateAccordian(){
		const oAccord = <Accordian key={this.state.dataObj.length} data={this.state.dataObj} onChildClick = {this.onChildClickAction} onContentEdit = {this.onContentEditAction} onContentDelete = {this.onContentDeleteAction} onContentUpDown = {this.onContentUpDownAction} />
		this.setState({content:oAccord});
	}

	formSubmit(){
		var that = this;  
		if(this.state.dataObj.length > 0){
			this.setState({isLoading : true});   
			let communityBO = JSON.parse(localStorage.getItem('community'));
			let requestOptions = {};
			if(!_.isEmpty(communityBO.communityFAQBOs))  {
				communityBO.communityFAQBOs[0]['communityPreferences']['summary'] = JSON.stringify(this.state.dataObj);
				requestOptions = communityBO.communityFAQBOs[0];
			}else{
				requestOptions = { 
					communityPreferences: {
						type:"Faq",
						code:"knowledge",
						active:"Y",
						summary:JSON.stringify(this.state.dataObj)
					} 
				};
			}
			
			apiServices.createPreferences(this.uuid, requestOptions).then(function(response){
			  that.setState({isLoading: false});
			  if(response.errors){
				// that.setState({activeTab: 'getknowlegeable-tab'});
			  }  
			  if(response.status === "SUCCESS"){
				//   that.props.community(response.community);
				  that.props.configTab('service-tab');
				  
			  }          
			});
		  }else{
			swal("No Information Section!", {
				icon: "error",
			});
		  }
	}

	render(){		

		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);		
		let uuid = community.community.uuid;
		this.uuid = uuid;
		let languageList = community.uuidLocales[uuid] ? community.uuidLocales[uuid] : [];
		this.languageList = languageList;
		// this.setState({language:languageList});

		console.log(this.state.content)
		let that = this;		
		return(
			
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
				<button className="btn btn-light" type="button" data-toggle="modal" data-target="#myModal" onClick={ e => (this.onChildClickAction(''))} >
						<span className="fa fa-plus"></span> Add Information
				</button>
				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">					
					<div className="modal-content">
					 	
					   <form id="addItems" onSubmit={this.addItems}>						
						<div className="card-body">	
							<ul className="nav nav-tabs" role="tablist">
								{
									this.languageList.map(function(item, index) {
										return (
										<li className="nav-item" key={index}>
											<a className={"nav-link " + (item.locale == 'en_US' ? 'active' : '')} id={'tab-'+item.locale} data-toggle="tab" href={`#${item.locale}`} role="tab" aria-controls={item.locale}>{item.displayName}</a>
										</li>
										)
									})
								}	
							</ul>	
							<div className="tab-content">
								{								
								this.languageList.map(function(value, index) {
									return (
										<div className={"tab-pane " + (value.locale == 'en_US' ? 'active' : '')} key={index} id={value.locale} role="tabpanel">
											<div className="form-group">
												<label className="control-label">Title</label>
												<input className={"form-control "+ (value.locale == 'en_US' ? that.errorClass(that.state.formErrors.title) : '')} name="title" id={'title-'+value.locale} type="text" data-lang={value.locale}											
													onChange={that.handleUserInput}
													placeholder="Enter a title ..." />
													<em className="error invalid-feedback">{that.state.formErrors.title}</em>
											</div>
											<div className="form-group">
												<label className="control-label" >Description</label>
												<textarea className="form-control" name="description" id={'description-'+value.locale}  rows="6" 								
												placeholder="Enter a description ..." data-lang={value.locale}
												onChange={that.handleUserInput}></textarea>
											</div>	
											<div className="row">
											<div className="col-lg-3">
											<div className="form-group">
												<label>Cover Image</label>
												<input type="file" name="coverUrl" data-lang={value.locale} className="communityLogo_fileupload form-control-file" accept=".jpg, .jpeg, .png"
													onChange={that.fileChangedHandler}/>
											</div>	
											</div>
											<div className="col-lg-2 logoThumbnails text-right">
												<img src={(that.item[value.locale] && that.item[value.locale].coverUrl ? that.item[value.locale].coverUrl : "../../assets/images/no-image.png")} className="img-responsive noImage"
												onError={(e) => {
													e.target.src = require("../../assets/images/no-image.png") // default image
												}}
												/>
											</div>
											<div className="col-lg-7">
											<div className="form-group">
												<label className="control-label">Video Url</label>
												<input className="form-control" name="video" id={'video-'+value.locale}  type="text" data-lang={value.locale}											
													onChange={that.handleUserInput}
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
					</div>
				</div>
				
				{this.state.content}

				<div className="text-center card-footer">
					<button type="Button" className="mr-3 btn btn-primary btn-sm" onClick={this.formSubmit}><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					{/* <button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button> */}
				</div>
			</div>				
		)
	}
}

export default GetKnowlegeable;