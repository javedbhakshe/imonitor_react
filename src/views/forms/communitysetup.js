import React, { Component } from 'react';
import Select from 'react-select';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';
import {aCommunityType, aCommunityLanguages, aCommCountries}  from '../../data/config';

class CommunitySetUp extends Component{
	constructor(props){
		super(props);
		
		let communityBO = localStorage.getItem('community'),
			community = JSON.parse(communityBO).community,
			oLocales = JSON.parse(communityBO).uuidLocales,
			aLocales = oLocales[community.uuid],
			aLangs = [],sView = community.defaultMapView? community.defaultMapView: '',
			oView = {value:sView === 'World' ? '' : sView , label:sView};


		for(let i in aLocales){
			let oTemp = {value:aLocales[i].locale,label: aLocales[i].displayName}
			aLangs.push(oTemp);
		}

        this.state = {
			uuid:community.uuid,
            name: community.name,
			emaill: community.emaill,
			active:community.active,
            type: community.type,
            project: community.project,
            summary: community.summary,
            helpDeskNo: community.helpDeskNo,
			defaultLocale: community.defaultLocale?community.defaultLocale: 'en_US',
			defaultMapView: community.defaultMapView? community.defaultMapView: '',
			logo: community.logo ? community.logo : '',
			featuredImage: community.featuredImage ? community.featuredImage : '',
			isLoading:false	,
			comType:{value:community.type,label:community.type},
			comLang:aLangs,		         
			comView:oView	         
		  }   
		  

	  	this.communityTypes = aCommunityType
	  	this.communityLanguages = aCommunityLanguages;
	  	this.communityCountries = aCommCountries

	}
	
	handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
	}

	fileChangedHandler = (e) => {
		const name = e.target.name;
		const file = e.target.files[0];
		
		let that = this;
		apiServices.cloudinaryUpload(file).then(function(response){
			if(response.url){
				that.setState({[name]: response.url});
			}       
		});
	}
	
	handleSubmit = (e) => {
        e.preventDefault();
        var that = this;  
        this.setState({isLoading : true});          
        if(this.state.name && this.state.emaill){
          let requestOptions = { community: this.state };
          apiServices.createCommunity(requestOptions).then(function(response){
			that.setState({isLoading: false});
            if(response.errors){
              that.setState({activeTab: 'appconfig-tab'});
            }  
            if(response.status === "SUCCESS"){
            	that.props.configTab('appconfig-tab');
            }          
          });
        }
	}
	
	handleDeactivate = (e) => {
		var that = this;  
		// that.setState({active : "N"});   
		that.state.active = 'N';
		if(that.state.name && that.state.emaill){
			let requestOptions = { community: that.state };
			apiServices.createCommunity(requestOptions).then(function(response){
			 apiServices.logout();
			});
		  }  
	}

    handleChange = (selectedOption, e) => {
	    let name = e.name;
	    this.setState({ [name]:selectedOption });
  	}

  	handleLanguageChange = (selectedOption, e) => {

  		console.log(e);
	 	let name = e.name,
	 		oRequestObject = {
	 			"uuid":this.state.uuid,
	 			"type":"COMMUNITY",
	 			"field":"name",
	 			"text":this.state.name,
	 			"locale_lang":'en_Us',
	 			"module":"IMONITOR"
 			};

	    this.setState({ [name]:selectedOption });
		if(e.action === 'select-option'){
  			oRequestObject.locale_lang = e.option.value;
  			oRequestObject.domain = "";
	  		apiServices.updateCommunityLangs(oRequestObject).then((e) => {
	  			console.log(e);
	  		});
		}else if(e.action === 'remove-value'){
			oRequestObject.locale_lang = e.removedValue.value;
			oRequestObject.deleteFlag = "true";
			oRequestObject.domain = "";
			apiServices.updateCommunityLangs(oRequestObject).then((e) => {
	  			console.log(e);
	  		});
		}
  	}
	
	render(){
		return(			
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
			<form onSubmit={this.handleSubmit}>
				<div className="card-body">
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Community Name</label>
							<input type="text"
							 name="name"
							 placeholder="Enter community name"
							 className="form-control"
							 id="community_name"
							 value={this.state.name}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Registered Email</label>
							<input className="form-control"
							 type="email" 
							 name="emaill" 
							 placeholder="Enter Community Registered Email" 
							 id='community_email'
							 disabled
							 value={this.state.emaill}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Project Name</label>
							<input className="form-control"
							 type="text"
							 name="project"
							 placeholder="Enter Project Name" 
							 id='project'
							 value={this.state.project}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Community Type</label>
							<Select
						        name="comType"
						        value={this.state.comType}
						        onChange={this.handleChange}
						        options={aCommunityType}
					      	/>
						</div>
					</div>
					<div className="col-lg-12">
					    <div className="form-group">
							<label className="control-label">Summary</label>
							<textarea className="form-control" name="summary" placeholder="Enter Summary" row="5" id="community_summary"
							value={this.state.summary} onChange={this.handleUserInput}></textarea>
						</div>
					</div>					
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Community Default Language</label>
							<Select
						        isMulti= {true} 
						        name="comLang"
						        value={this.state.comLang}
						        onChange={this.handleLanguageChange}
						        options={aCommunityLanguages}
					      	/>
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Default Map View</label>
							<Select
						        name="comView"
						        value={this.state.comView}
						        onChange={this.handleChange}
						        options={aCommCountries}
					      	/>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Helpdesk Number</label>
							<input type="text" name="helpDeskNo" placeholder="Enter Helpdesk Number" className="form-control" id="community_helpdesknumber"
							value={this.state.helpDeskNo} onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Community UUID</label>
							<input className="form-control"
							 type="text" 
							 name="uuid" 
							 placeholder="Enter Community UUID" 
							 id='community_uuid'
							 disabled
							 value={this.state.uuid}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-3">
						<div className="form-group">
							<label>Logo</label>
							<input type="file" name="logo" className="communityLogo_fileupload form-control-file" accept=".jpg, .jpeg, .png"
							onChange={this.fileChangedHandler} />
						</div>
					</div>
					<div className="col-lg-3 logoThumbnails text-right">
						<img src={this.state.logo} className="img-responsive noImage"
						onError={(e) => {
							e.target.src = require("../../assets/images/no-image.png") // default image
						 }}
						  />
					</div>
					<div className="col-lg-3">
						<div className="form-group">
							<label>Featured Image</label>
							<input type="file" name="featuredImage" className="feauturedImage_fileupload form-control-file" 
							onChange={this.fileChangedHandler} />
						</div>
					</div>
					<div className="col-lg-3 fIThumbnails text-right">
						<img src={this.state.featuredImage} className="img-responsive noImage"
						 onError={(e) => {
							e.target.src = require("../../assets/images/no-image.png") // default image
						 }}
						  />
					</div>
					</div>
				</div>
				<div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button className="btn btn-danger btn-sm float-right" onClick={this.handleDeactivate}><i className="fa fa-ban"></i> Deactive</button>
				</div>
			</form>
			</div>			
		);
	}
}

export default CommunitySetUp;