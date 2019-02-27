import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';

class AppConfig extends Component{
	constructor(props){
		super(props);		
		let communityBO = localStorage.getItem('community'),
		community = JSON.parse(communityBO).community;

        this.state = {
			uuid:community.uuid,
			name: community.name,
			emaill: community.emaill,
			active:community.active,
            cloudinaryCloudName: community.cloudinaryCloudName,
			cloudinaryPreset: community.cloudinaryPreset,
			mixpanelApiKey:community.mixpanelApiKey,
            mixpanelApiSecret: community.mixpanelApiSecret,
            mixpanelToken: community.mixpanelToken,
            onesignal_appId: community.onesignal_appId,
            onesignal_explorer_appId: community.onesignal_explorer_appId,
			onesignal_explorer_restApi: community.onesignal_explorer_restApi,
            onesignal_restApi: community.onesignal_restApi,
			isLoading:false			      
		  }   
		
		  this.handleUserInput = this.handleUserInput.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
		  this.handleDeactivate = this.handleDeactivate.bind(this);
	}
	
	handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
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
              that.setState({activeTab: 'home-tab'});
            }  
            if(response.status === "SUCCESS"){
            	that.props.configTab('home-tab');
            }          
          });
        }
	}

	handleDeactivate = (e) => {		
		this.setState({active : "N"});  
		this.state.active = "N"; 
		if(this.state.name && this.state.emaill){
			let requestOptions = { community: this.state };
			apiServices.createCommunity(requestOptions).then(function(response){
			 apiServices.logout();
			});
		  }  
	}

    handleChange = (selectedOption, e) => {
	    let name = e.name;
	    this.setState({ [name]:selectedOption });
  	}


	render(){
		return(
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
			<form onSubmit={this.handleSubmit}>
				<div className="card-body">
					<h4 className="title">Cloudinary Setting</h4>
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Cloudinary Cloud Name</label>
							<input type="text"
							 name="cloudinaryCloudName"
							 placeholder="Enter Cloudinary Cloud Name"
							 className="form-control"
							 id="cloudinaryCloudName"
							 value={this.state.cloudinaryCloudName}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Cloudinary Preset</label>
							<input type="text"
							 name="cloudinaryPreset"
							 placeholder="Enter Cloudinary Preset"
							 className="form-control"
							 id="cloudinaryPreset"
							 value={this.state.cloudinaryPreset}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					</div>
					<h4 className="title">Mixpanel Setting</h4>
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Mixpanel Api Key</label>
							<input type="text"
							 name="mixpanelApiKey"
							 placeholder="Enter Mixpanel Api Key"
							 className="form-control"
							 id="mixpanelApiKey"
							 value={this.state.mixpanelApiKey}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Mixpanel Api Secret</label>
							<input type="text"
							 name="mixpanelApiSecret"
							 placeholder="Enter Mixpanel Api Secret"
							 className="form-control"
							 id="mixpanelApiSecret"
							 value={this.state.mixpanelApiSecret}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Mixpanel Token</label>
							<input type="text"
							 name="mixpanelToken"
							 placeholder="Enter Mixpanel Token"
							 className="form-control"
							 id="mixpanelToken"
							 value={this.state.mixpanelToken}
							 onChange={this.handleUserInput} />
						</div>
					</div>					
					</div>
					<h4 className="title">Onesignal Setting</h4>
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">onesignal appId</label>
							<input type="text"
							 name="onesignal_appId"
							 placeholder="Enter onesignal appId"
							 className="form-control"
							 id="onesignal_appId"
							 value={this.state.onesignal_appId}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">onesignal explorer appId</label>
							<input type="text"
							 name="onesignal_explorer_appId"
							 placeholder="Enter onesignal explorer appId"
							 className="form-control"
							 id="onesignal_explorer_appId"
							 value={this.state.onesignal_explorer_appId}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">onesignal explorer restApi</label>
							<input type="text"
							 name="onesignal_explorer_restApi"
							 placeholder="Enter onesignal explorer restApi"
							 className="form-control"
							 id="onesignal_explorer_restApi"
							 value={this.state.onesignal_explorer_restApi}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">onesignal restApi</label>
							<input type="text"
							 name="onesignal_restApi"
							 placeholder="Enter onesignal restApi"
							 className="form-control"
							 id="onesignal_restApi 	"
							 value={this.state.onesignal_restApi}
							 onChange={this.handleUserInput} />
						</div>
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

export default AppConfig;