import React,{Component} from 'react';
import CommunitySetUp from './forms/communitysetup';
import AppConfig from './forms/appconfig';
import GetKnowlegeable from './forms/getknowlegeable';
import Services from './forms/services';
import SmartMap from './forms/smartmap';
import Nearme from './forms/nearme';
import Finish from './forms/finish';
import classnames from 'classnames';
import {connect} from 'react-redux';

class SmartSetup extends Component{
	
  	state = {activeTab: 'home-tab'};

  	toggle = (activeTab) => {
  		if (this.state.activeTab !== activeTab) {
	      	this.setState({activeTab});
	 	}
  	}
	  
	toggleActive = (activeTab) => {
		document.getElementById(activeTab).click();

		// console.log(this.props.community.key_value_pairs);
		let community = this.props.community;
		if(!this.props.community){
			let communityBO = JSON.parse(localStorage.getItem('community'));
			community = communityBO.community;
		}	

		if(community.key_value_pairs){
			let oSections = JSON.parse(community.key_value_pairs),
				aMenus = ['Setup'];

			for(let i in oSections){
				aMenus.push(oSections[i].value);
			}
			this.props.testFn(aMenus);
		}

	}

  	
  	render() {
	    return (
	      	<div className='container-fluid my-4'>
		      	<div className='row'>
			      	<div className='col-sm-12'>
			      		<ul className="nav nav-tabs sstab" id="myTab" role="tablist">
						  <li className={`nav-item ${classnames({ active: this.state.activeTab === 'appconfig-tab' })}`}>
						     	
							    <a className="nav-link ssup" 
						    		id="appconfig-tab" data-toggle="tab" 
						    		href="#appconfig" role="tab" 
						    		aria-controls="appconfig" 
						    		aria-selected="false"
						    		onClick={() => { this.toggle('appconfig-tab')}}
						    	>
						    	Dashboard Config
						    	</a>
						  		<div className="nav-arrow"></div>
						  	</li>
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'home-tab' })}`}>
							  <div className="nav-wedge"></div>
							    <a className="nav-link ssup active" 
							    	id="home-tab" data-toggle="tab" 
							    	href="#home" role="tab" 
							    	aria-controls="home" 
							    	aria-selected="true"
						    	 	onClick={() => { this.toggle('home-tab') }}>
							    	Community SetUp
							    </a>
					  		 	<div className="nav-arrow"></div>
						  	</li>						  	
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'getknowlegeable-tab' })}`}>
						    	<div className="nav-wedge"></div>
						    	<a className="nav-link ssup" 
							    	id="getknowlegeable-tab" 
							    	data-toggle="tab" 
							    	href="#getknowlegeable" 
							    	role="tab" 
							    	aria-controls="getknowlegeable" 
							    	aria-selected="false"
							    	onClick={() => { this.toggle('getknowlegeable-tab')}}>
							    	Get Knowlegeable
						    	</a>
						    	<div className="nav-arrow"></div>
						  	</li>
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'service-tab' })}`}>
						     	<div className="nav-wedge"></div>
							    <a className="nav-link ssup" 
						    		id="service-tab" data-toggle="tab" 
						    		href="#service" role="tab" 
						    		aria-controls="service" 
						    		aria-selected="false"
						    		onClick={() => { this.toggle('service-tab')}}
						    	>
						    	Get Involved
						    	</a>
						  		<div className="nav-arrow"></div>
						  	</li>
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'nearme-tab' })}`}>
						    	<div className="nav-wedge"></div>
						    	<a className="nav-link ssup" 
							    	id="nearme-tab" 
							    	data-toggle="tab" 
							    	href="#nearme" 
							    	role="tab" 
							    	aria-controls="nearme" 
							    	aria-selected="false"
							    	onClick={() => { this.toggle('nearme-tab')}}>
							    	Nearme
						    	</a>
						    	<div className="nav-arrow"></div>
						  	</li>
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'finish-tab' })}`}>
						     	<div className="nav-wedge"></div>
							    <a className="nav-link ssup" 
						    		id="finish-tab" data-toggle="tab" 
						    		href="#finish" role="tab" 
						    		aria-controls="finish" 
						    		aria-selected="false"
						    		onClick={() => { this.toggle('finish-tab')}}
						    	>
						    	Finish
						    	</a>
						  		<div className="nav-arrow"></div>
						  	</li>
						</ul>
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade" id="appconfig" role="tabpanel" aria-labelledby="appconfig-tab">
						  		<AppConfig configTab={this.toggleActive} />
						  	</div>
						  	<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
						  		<CommunitySetUp configTab={this.toggleActive} />
						  	</div>						  	
						  	<div className="tab-pane fade" id="getknowlegeable" role="tabpanel" aria-labelledby="getknowlegeable-tab">
						  		<GetKnowlegeable configTab={this.toggleActive} />
						  	</div>
							<div className="tab-pane fade" id="service" role="tabpanel" aria-labelledby="service-tab">
							  <Services />
						  	</div>
						  	<div className="tab-pane fade" id="nearme" role="tabpanel" aria-labelledby="nearme-tab">
						  		<Nearme />
						  	</div>
						  	<div className="tab-pane fade" id="finish" role="tabpanel" aria-labelledby="finish-tab">
						  		<Finish />
						  	</div>
						</div>
		      		</div>
		      	</div>
	      	</div>
	    );
  	}
}


const mapStateToProps = state => {		
	return { community: state.community };
}

export default connect(
	mapStateToProps
  )(SmartSetup)