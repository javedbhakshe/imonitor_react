import React,{Component} from 'react';
import Services from './Services';
import classnames from 'classnames';

class SurveyService extends Component{

    state = {       
        isLoading:false,        
        activeTab: 'services'
       
    }

    toggle = (activeTab) => {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab});
       }
    }   

    toggleActive = (activeTab) => {
        this.props.configTab(activeTab);
    }


	render(){
		return(
			<div>
                 
                <div className="nav nav-tabs nearmeTab" role="tablist">
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'services' })}`} onClick={() => { this.toggle('services')}} title="Add services" data-toggle="tab" href="#services" role="tab" aria-controls="services" >
                        <span className="fa fa-home" data-toggle="tab" href="#services" role="tab" aria-controls="services"></span> Services
                    </button>
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'survey' })}`} onClick={() => { this.toggle('survey')}} title="Add survey" data-toggle="tab" href="#survey" role="tab" aria-controls="survey" >
                        <span className="fa fa-list" data-toggle="tab" href="#survey" role="tab" aria-controls="survey"></span> Survey
                    </button>   
                </div> <div className="clear"></div>
                <div className="tab-content">
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'services' })}`} style={{padding:'1px'}} id="services" role="tabpanel">
                    <Services configTab={this.toggleActive} serviceType='Service' />
                  </div>
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'survey' })}`} style={{padding:'1px'}} id="survey" role="tabpanel">
                    <Services configTab={this.toggleActive} serviceType='Survey' />
                  </div>
                </div>
             </div>                
           
		);
	}
}
export default SurveyService;