import React, { Component } from 'react';

class Services extends Component{
	render(){
		return(
            <div className="card-body">
              <div className="row">
              
              <div className="col-3 no-padding">
              <div className="card">
              <div className="card-header">
              <i className="icon-plus"></i> Services 
               
              </div>    
              
              <div className="list-group" id="list-tab" role="tablist">
                <a className="list-group-item list-group-item-action active show" id="list-home-list" data-toggle="tab" href="#list-home" role="tab" aria-controls="list-home" aria-selected="true">Water Supply  <i className="fa fa-trash-o float-right"></i></a>
                <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="tab" href="#list-profile" role="tab" aria-controls="list-profile" aria-selected="false">Domestic violence <i className="fa fa-trash-o float-right"></i></a>
                <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="tab" href="#list-messages" role="tab" aria-controls="list-messages" aria-selected="false">Transport <i className="fa fa-trash-o float-right"></i></a>
                <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="tab" href="#list-settings" role="tab" aria-controls="list-settings" aria-selected="false">Electricity <i className="fa fa-trash-o float-right"></i></a>
              </div>
             
              </div>
            </div>
            <div className="col-4 no-padding">
            <div className="card">
              <div className="card-header">
              <i className="icon-plus"></i> Questions 
              
              </div>    
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade active show" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                  <div className="list-group">
                      <a className="list-group-item list-group-item-action flex-column align-items-start active" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small><i className="icon-note"></i> <i className="fa fa-trash-o"></i></small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted"><i className="icon-note"></i> <i className="fa fa-trash-o"></i></small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted"><i className="icon-note"></i> <i className="fa fa-trash-o"></i></small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      </div>
                  </div>
                  <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                  <div className="list-group">
                      <a className="list-group-item list-group-item-action flex-column align-items-start active" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small>3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      </div>
                  </div>
                  <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                  <div className="list-group">
                      <a className="list-group-item list-group-item-action flex-column align-items-start active" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small>3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      </div>
                  </div>
                  <div className="tab-pane fade " id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                 
                      <div className="list-group">
                      <a className="list-group-item list-group-item-action flex-column align-items-start active" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small>3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      <a className="list-group-item list-group-item-action flex-column align-items-start" href="#">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">List group item heading</h5>
                      <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small className="text-muted">Donec id elit non mi porta.</small>
                      </a>
                      </div>
                     
                  </div>
              </div>
              </div>
            </div>

            <div className="col-5 no-padding">
            <div className="card">
              <div className="card-header">
              <i className="icon-note"></i> Masked Input Plugin for jQuery
             
              </div>
              <div className="card-body">
              <form>
              <fieldset className="form-group">
              <label>Date input</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-calendar"></i>
              </span>
              </span>
              <input className="form-control" id="date" type="text" />
              </div>
              <small className="text-muted">ex. 99/99/9999</small>
              </fieldset>
              <fieldset className="form-group">
              <label>Phone input</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-phone"></i>
              </span>
              </span>
              <input className="form-control" id="phone" type="text" />
              </div>
              <small className="text-muted">ex. (999) 999-9999</small>
              </fieldset>
              <fieldset className="form-group">
              <label>Taxpayer Identification Numbers</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-usd"></i>
              </span>
              </span>
              <input className="form-control" id="tin" type="text" />
              </div>
              <small className="text-muted">ex. 99-9999999</small>
              </fieldset>
              <fieldset className="form-group">
              <label>Social Security Number</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-male"></i>
              </span>
              </span>
              <input className="form-control" id="ssn" type="text" />
              </div>
              <small className="text-muted">ex. 999-99-9999</small>
              </fieldset>
              <fieldset className="form-group">
              <label>Eye Script</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-asterisk"></i>
              </span>
              </span>
              <input className="form-control" id="eyescript" type="text" />
              </div>
              <small className="text-muted">ex. ~9.99 ~9.99 999</small>
              </fieldset>
              <fieldset className="form-group">
              <label>Credit Card Number</label>
              <div className="input-group">
              <span className="input-group-prepend">
              <span className="input-group-text">
              <i className="fa fa-credit-card"></i>
              </span>
              </span>
              <input className="form-control" id="ccn" type="text" placeholder="0000 0000 0000 0000" />
              </div>
              <small className="text-muted">ex. 9999 9999 9999 9999</small>
              </fieldset>
              </form>
              </div>
              </div>
              </div>

          </div>
        </div>
           
		);
	}
}

export default Services;