import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import Accordian from '../../components/custom/accordian'

class GetKnowlegeable extends Component{
	
	constructor(props){
		super(props);

		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);
		let uuid = community.community.uuid;
		let languageList = community.uuidLocales[uuid];
		
		this.state = {				
			content:[],
			dataObj:[],
			language:languageList,			
			isLoading:false,
			reload:false,
			level:''		         
		  }
	
		this.item = {};
		this.languageList = languageList;
		this.addItems = this.addItems.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.onChildClickAction  = this.onChildClickAction.bind(this);
	}
	
	handleUserInput = (e) => {
		let lang = e.target.dataset["lang"];		
		if(!this.item[lang]){
			this.item[lang]={}
		}		
        const name = e.target.name;
		const value = e.target.value;

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

	addItems(e){
		console.log(this.state.level);
		e.preventDefault();		

		let levelInx = this.state.level;
		if(levelInx == ''){
			this.state.dataObj.push(this.item);
		}else{
			let innerData = this.state.dataObj[levelInx];	
			if(!innerData['data']){
				innerData['data']=[]
			}
			innerData['data'].push(this.item);
			
		}
		
		this.item = {};	
		const oAccord = <Accordian key={this.state.dataObj.length + levelInx} data={this.state.dataObj} onChildClick = {this.onChildClickAction} />
		this.setState({content:oAccord});
		document.getElementById("closeModel").click();	
		document.getElementById('addItems').reset();
		this.setState({reload : true, level:'' });	
	}

	onChildClickAction(d){		
		this.setState({level:d});
	}

	render(){		
		console.log(this.state.content)
		let that = this;		
		return(
			
			<div className="card">
				<button className="btn btn-light" type="button" data-toggle="modal" data-target="#myModal" >
						<span className="fa fa-plus"></span> Add
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
											<a className={"nav-link " + (index == 0 ? 'active' : '')} data-toggle="tab" href={`#${item.locale}`} role="tab" aria-controls={item.locale}>{item.displayName}</a>
										</li>
										)
									})
								}	
							</ul>	
							<div className="tab-content">
								{								
								this.languageList.map(function(value, index) {
									return (
										<div className={"tab-pane " + (index == 0 ? 'active' : '')} key={index} id={value.locale} role="tabpanel">
											<div className="form-group">
												<label className="control-label">Title</label>
												<input className="form-control" name="title" type="text" data-lang={value.locale}											
													onChange={that.handleUserInput}
													placeholder="Enter a title ..." />
											</div>
											<div className="form-group">
												<label className="control-label" >Description</label>
												<textarea className="form-control" name="description"  rows="6" 								
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
												<img src={(that.item[value.locale]? that.item[value.locale].coverUrl : "../../assets/images/no-image.png")} className="img-responsive noImage"
												onError={(e) => {
													e.target.src = require("../../assets/images/no-image.png") // default image
												}}
												/>
											</div>
											<div className="col-lg-7">
											<div className="form-group">
												<label className="control-label">Video Url</label>
												<input className="form-control" name="video" type="text" data-lang={value.locale}											
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
							<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
							<button type="button" className="btn btn-danger btn-sm" id="closeModel" data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
						</div>
						</form>					
					</div>
					</div>
				</div>
				
				{this.state.content}
				
				<div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button>
				</div>
			</div>				
		)
	}
}

export default GetKnowlegeable;