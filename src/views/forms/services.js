import React, { Component } from 'react';

class Services extends Component{
	render(){
		return(
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="btn-group">
                    <button className="btn btn-light" type="button">
    		         		  <span className="fa fa-plus"></span> 
    	         	    </button>
                    <button className="btn btn-light" type="button">
						      		<span className="fa fa-trash-o"></span>
						      	</button>
                    <button className="btn btn-light" type="button">
						      		<span className="fa fa-pencil-square-o"></span>
						      	</button>
                  </div>
                
              <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action active show" id="list-home-list" data-toggle="tab" href="#list-home" role="tab" aria-controls="list-home" aria-selected="true">Water Supply</a>
                <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="tab" href="#list-profile" role="tab" aria-controls="list-profile" aria-selected="false">Domestic violence</a>
                <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="tab" href="#list-messages" role="tab" aria-controls="list-messages" aria-selected="false">Transport</a>
                <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="tab" href="#list-settings" role="tab" aria-controls="list-settings" aria-selected="false">Electricity</a>
              </div>

            </div>
            <div className="col-8">
              <div className="btn-group">
                  <button className="btn btn-light" type="button">
				         		<span className="fa fa-plus"></span> 
				         	</button>
                  <button className="btn btn-light" type="button">
					      		<span className="fa fa-trash-o"></span>
					      	</button>
                  <button className="btn btn-light" type="button">
					      		<span className="fa fa-pencil-square-o"></span>
					      	</button>
              </div>
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade active show" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                    <div className="card-body">
                      <div className="bd-example bd-example-type">
                          <table className="table">
                              <tbody>
                                <tr>
                                  <td><p className="h6">What venue you are surveying</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Do you see anyone smoking?</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Did you find the venue?</p></td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <div className="card-body">
                      <div className="bd-example bd-example-type">
                          <table className="table">
                              <tbody>
                                <tr>
                                  <td><p className="h6">What venue you are surveying</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Do you see anyone smoking?</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Did you find the venue?</p></td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                      <div className="card-body">
                      <div className="bd-example bd-example-type">
                          <table className="table">
                              <tbody>
                                
                                <tr>
                                  <td><p className="h6">Do you see anyone smoking?</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Did you find the venue?</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">What venue you are surveying</p></td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade " id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                      <div className="card-body">
                      <div className="bd-example bd-example-type">
                          <table className="table">
                              <tbody>
                                <tr>
                                  <td><p className="h6">What venue you are surveying</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Did you find the venue?</p></td>
                                </tr>
                                <tr>
                                  <td><p className="h6">Do you see anyone smoking?</p></td>
                                </tr>
                                
                              </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
           
		);
	}
}

export default Services;