import React,{Component} from 'react';
import CommunitySetUp from './forms/communitysetup';
import AppConfig from './forms/appconfig';
import GetKnowlegeable from './forms/getknowlegeable';
import Services from './forms/Services';
/*import SmartMap from './forms/smartmap';*/
import Nearme from './forms/nearme';
import Translation from './forms/Translation';
import Users from './forms/Users';
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
		
		if(this.props.community){
			if(this.props.community.key_value_pairs){
				let oSections = JSON.parse(this.props.community.key_value_pairs),
				aMenus = ['Setup'];
				let dashboardData = oSections.dashboard;

			for(let i in dashboardData){
				aMenus.push(dashboardData[i].value);
			}
			this.props.testFn(aMenus);
			}			
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
						    	Config
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
							<li className={`nav-item ${classnames({ active: this.state.activeTab === 'survey-tab' })}`}>
						     	<div className="nav-wedge"></div>
							    <a className="nav-link ssup" 
						    		id="survey-tab" data-toggle="tab" 
						    		href="#survey" role="tab" 
						    		aria-controls="survey" 
						    		aria-selected="false"
						    		onClick={() => { this.toggle('survey-tab')}}
						    	>
						    	Survey
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
							<li className={`nav-item ${classnames({ active: this.state.activeTab === 'translation-tab' })}`}>
						    	<div className="nav-wedge"></div>
						    	<a className="nav-link ssup" 
							    	id="translation-tab" 
							    	data-toggle="tab" 
							    	href="#translation" 
							    	role="tab" 
							    	aria-controls="translation" 
							    	aria-selected="false"
							    	onClick={() => { this.toggle('translation-tab')}}>
							    	Translation
						    	</a>
						    	<div className="nav-arrow"></div>
						  	</li>
							<li className={`nav-item ${classnames({ active: this.state.activeTab === 'users-tab' })}`}>
						    	<div className="nav-wedge"></div>
						    	<a className="nav-link ssup" 
							    	id="users-tab" 
							    	data-toggle="tab" 
							    	href="#users" 
							    	role="tab" 
							    	aria-controls="users" 
							    	aria-selected="false"
							    	onClick={() => { this.toggle('users-tab')}}>
							    	Users
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
							  <Services configTab={this.toggleActive} serviceType='Service' />
						  	</div>
							<div className="tab-pane fade" id="survey" role="tabpanel" aria-labelledby="survey-tab">
							  <Services configTab={this.toggleActive} serviceType='Survey' />
						  	</div>
						  	<div className="tab-pane fade" id="nearme" role="tabpanel" aria-labelledby="nearme-tab">
						  		<Nearme configTab={this.toggleActive} />
						  	</div>
							<div className="tab-pane fade" id="translation" role="tabpanel" aria-labelledby="translation-tab">
						  		<Translation />
						  	</div>
							<div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
						  		<Users />
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