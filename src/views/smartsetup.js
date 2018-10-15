import React,{Component} from 'react';
import CommunitySetUp from './forms/communitysetup'

import classnames from 'classnames';
class SmartSetup extends Component{
	constructor(props) {
	    super(props);
	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      activeTab: 'home-tab'
	    };
  	}

  	toggle(tab){
  		if (this.state.activeTab !== tab) {
	      	this.setState({
		        activeTab: tab
	      	});
	    }
  	}

  	
  	render() {
	    return (
	      	<div className='container-fluid my-4'>
		      	<div className='row'>
			      	<div className='col-sm-12'>
			      		<ul className="nav nav-tabs sstab" id="myTab" role="tablist">
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'home-tab' })}`}>
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
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'profile-tab' })}`}>
						     	<div className="nav-wedge"></div>
							    <a className="nav-link ssup" 
						    		id="profile-tab" data-toggle="tab" 
						    		href="#profile" role="tab" 
						    		aria-controls="profile" 
						    		aria-selected="false"
						    		onClick={() => { this.toggle('profile-tab')}}
						    	>
						    	Profile
						    	</a>
						  		<div className="nav-arrow"></div>
						  	</li>
						  	<li className={`nav-item ${classnames({ active: this.state.activeTab === 'contact-tab' })}`}>
						    	<div className="nav-wedge"></div>
						    	<a className="nav-link ssup" 
							    	id="contact-tab" 
							    	data-toggle="tab" 
							    	href="#contact" 
							    	role="tab" 
							    	aria-controls="contact" 
							    	aria-selected="false"
							    	onClick={() => { this.toggle('contact-tab')}}>
							    	Contact
						    	</a>
						  	</li>
						</ul>
						<div className="tab-content" id="myTabContent">
						  	<div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
						  		<CommunitySetUp />
						  	</div>
						  	<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
						  		Get Know
						  	</div>
						  	<div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
						  		Survey
						  	</div>
						</div>
		      		</div>
		      	</div>
	      	</div>
	    );
  	}
}

export default SmartSetup;