import React,{Component} from 'react';
import Loader from '../../components/loaders/loader';
import Select from 'react-select';
import {aMobileSections, templateType}  from '../../data/config';
import { apiServices } from '../../services/apiServices';
import swal from 'sweetalert';
import MailModal from '../../components/modals/MailModal';

class Finish extends Component{	

	constructor(props){
		super(props);

		let communityBO = JSON.parse(localStorage.getItem('community'));				

	 	let community = communityBO.community,			
			oDisplaysects = {}, aTemplateSects = [],aMobilesects = [];

		if(community.key_value_pairs){
			oDisplaysects = JSON.parse(community.key_value_pairs);
			aTemplateSects = oDisplaysects.template;
			aMobilesects = oDisplaysects.mobile;
		}	

		this.state = {
			uuid:community.uuid,
			name: community.name,
			emaill: community.emaill,
            facebook: oDisplaysects.facebook,
			twitter: oDisplaysects.twitter,
			playstore:oDisplaysects.playstore,
            appstore: oDisplaysects.appstore,
            storeMessage: oDisplaysects.storeMessage,                       
			isLoading:false,			
			template:aTemplateSects,
			mobileSections:aMobilesects,
			submitType:'',
			modalShow:false
	  	}

	}

	handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
	}

	handleSubmit = (e) => {
        e.preventDefault();
        var that = this;  
        console.log(this.state);
        this.setState({isLoading : true});          
        if(this.state.name && this.state.emaill){
			let communityBO = JSON.parse(localStorage.getItem('community'));
			let community = communityBO.community;		
			let oKeyVal = {}
			if(community.key_value_pairs){
				oKeyVal = JSON.parse(community.key_value_pairs);
			}
			oKeyVal['facebook'] = this.state.facebook;
			oKeyVal['twitter'] = this.state.twitter;
			oKeyVal['playstore'] = this.state.playstore;
			oKeyVal['appstore'] = this.state.appstore;
			oKeyVal['storeMessage'] = this.state.storeMessage;
			oKeyVal['template'] = this.state.template;		
			oKeyVal['mobileSections'] = this.state.mobileSections;

			community['key_value_pairs'] = JSON.stringify(oKeyVal);

			let requestOptions =  {
				community:community
			};
			
			apiServices.createCommunity(requestOptions).then(function(response){
				that.setState({isLoading: false});
				if(response.errors){
				
				}  
				if(response.status === "SUCCESS"){
					if(that.state.submitType == 'white'){
						that.setState({modalShow:true});
					}else{
						that.setState({modalShow:false});
						swal("Please Download iMonitor APP from Store", {
							icon: "success",
						});
					}
				}          
			});
        }
	}
	
	handleChange = (selectedOption, e) => {
	    let name = e.name;
	    this.setState({ [name]:selectedOption });
  	}

	setSubmit = (name) => {
		this.setState({submitType:name});
	};

	hideModalBox = () =>{
		this.setState({modalShow:false});
	}

	render(){
		return(			
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
			<MailModal show={this.state.modalShow} hideModalBox={this.hideModalBox}/>
			<form onSubmit={this.handleSubmit}>
				<div className="card-body">
					<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12">
					    <div className="form-group">
							<label className="control-label">Mobile Sections</label>
							<Select
						        name="mobileSections"
						        placeholder="Please select mobile sections"
						        onChange={this.handleChange}
						        value={this.state.mobileSections}
						   		isMulti={true}
						        options={aMobileSections}
					      	/>
						</div>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12">
					    <div className="form-group">
							<label className="control-label">Template Type</label>
							<Select
						        name="template"
						        placeholder="Please select template"
						        onChange={this.handleChange}
						        value={this.state.template}						   		
						        options={templateType}
					      	/>
						</div>
					</div>
					</div>
					<div className="breadcrumb pl-0">
						<strong>Social Media</strong>
					</div>
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Facebook</label>
							<input type="text"
							 name="facebook"
							 placeholder="Enter Facebook Link"
							 className="form-control"
							 id="facebook"
							 value={this.state.facebook}
							 onChange={this.handleUserInput} />
						</div>
					</div>					
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Twitter</label>
							<input className="form-control"
							 type="text"
							 name="twitter"
							 placeholder="Enter Twitter Link" 
							 id='twitter'
							 value={this.state.twitter}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					</div>
					<div className="breadcrumb pl-0">
						<strong>Store Link</strong>
					</div>
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Play Store</label>
							<input type="text"
							 name="playstore"
							 placeholder="Enter Play Store Link"
							 className="form-control"
							 id="playstore"
							 value={this.state.playstore}
							 onChange={this.handleUserInput} />
						</div>
					</div>					
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">App Store</label>
							<input className="form-control"
							 type="text"
							 name="appstore"
							 placeholder="Enter App Store" 
							 id='appstore'
							 value={this.state.appstore}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-12">
					    <div className="form-group">
							<label className="control-label">Message</label>
							<textarea className="form-control" name="storeMessage" placeholder="Enter Store Message" row="5" id="storeMessage"
							value={this.state.storeMessage} onChange={this.handleUserInput}></textarea>
						</div>
					</div>	
					
					</div>
				</div>
				<div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm" onClick={e => this.setSubmit('app')}><i className="fa fa-dot-circle-o"></i> Save and continue with app label </button>
					<button type="submit" className="btn btn-danger btn-sm" onClick={e => this.setSubmit('white')}><i className="fa fa-ban "></i> Save and continue with white label</button>
				</div>
			</form>
			</div>			
		);
	}
}
export default Finish;