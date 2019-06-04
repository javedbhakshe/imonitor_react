import React, { Component } from 'react';
import classnames from 'classnames';
import DashboardUsers from '../../components/Users/DashboardUsers';
import MobileUsers from '../../components/Users/MobileUsers';

class Users extends Component{

    state = {       
        isLoading:false,        
        activeTab: 'dashnoard'
       
    }

    toggle = (activeTab) => {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab});
       }
    }   

   


    render(){
		return(
			<div className="card">
                <div className="card-body">                
                
                <div className="nav nav-tabs nearmeTab" role="tablist">
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'dashnoard' })}`} onClick={() => { this.toggle('dashnoard')}} title="Add Content" data-toggle="tab" href="#dashnoard" role="tab" aria-controls="dashnoard" >
                        <span className="fa fa-home" data-toggle="tab" href="#dashnoard" role="tab" aria-controls="dashnoard"></span> Dashboard Users
                    </button>
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'mobile' })}`} onClick={() => { this.toggle('mobile')}} title="Add Content" data-toggle="tab" href="#mobile" role="tab" aria-controls="mobile" >
                        <span className="fa fa-list" data-toggle="tab" href="#mobile" role="tab" aria-controls="mobile"></span> Mobile Users
                    </button>   
                </div> <div className="clear"></div>
                <div className="tab-content">
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'dashnoard' })}`} id="dashnoard" role="tabpanel">
                    <DashboardUsers />
                  </div>
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'mobile' })}`} id="mobile" role="tabpanel">
                    <MobileUsers />
                  </div>
                </div>
                </div>                
            </div>
		);
	}
}

export default Users;