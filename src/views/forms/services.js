import React,{Component} from 'react';
import ServicesModal from '../../components/modals/servicesModal'

class Services extends Component{

  constructor(props){
    super(props);
    this.state = {};

    /* Events handlers */
    /*this.handleAddServiceEvent = this.handleAddServiceEvent.bind(this);*/
    this.getServiceTitle = this.getServiceTitle.bind(this);
  }

  /*handleAddServiceEvent(e){
    console.log('Add services clicked');
  }*/

  getServiceTitle(e){
    console.log(e);
  }


  render(){
    return(
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-12">
            <ServicesModal getFormData = {this.getServiceTitle}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Services;