import React,{Component} from 'react';
import {DataTable} from 'react-data-components';

class Analytics extends Component{

	

	render(){
		let aColumns = [
			{ title: 'Name', prop: 'name'  },
	 	 	{ title: 'City', prop: 'city' },
		  	{ title: 'Address', prop: 'address' },
		  	{ title: 'Phone', prop: 'phone' }
	  	],
	  	aData = [
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },	  	
			{ name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }	  	
	  	];


		return(			
			<div className='container-fluid  my-4'>
				<div id="ui-view">
					<div><div className="animated fadeIn">
						<div className="email-app mb-4">
						<div className="card">
							<div className="card-header">
							<i className="fa fa-align-justify"></i> Filter(s)
							</div>
							<div className="card-body">
							<div className="form-group">
								<h6>Status Type :</h6>
								<div className="form-check checkbox">
								<input className="form-check-input" name="status" id="check1" type="checkbox" value="Open" />
								<label className="form-check-label" >Open</label>
								</div>
								<div className="form-check checkbox">
								<input className="form-check-input" name="status" id="check2" type="checkbox" value="Resolved" />
								<label className="form-check-label" >Resolved</label>
								</div>
								<div className="form-check checkbox">
								<input className="form-check-input" name="status" id="check3" type="checkbox" value="Valid" />
								<label className="form-check-label" >Valid</label>
								</div>
								<div className="form-check checkbox">
								<input className="form-check-input" name="status" id="check4" type="checkbox" value="Declined" />
								<label className="form-check-label" >Declined</label>
								</div>
								<div className="form-check checkbox">
								<input className="form-check-input" name="status" id="check5" type="checkbox" value="Unresolved" />
								<label className="form-check-label" >Unresolved</label>
								</div>
								
							</div>
							<div className="form-group">
							<h6>Date Range :</h6>							
								<span>From Date:</span> <br />
								<input id="startDate" width="276" /> <br />
								<span>To Date:</span>  <br />
								<input id="endDate" width="276" />							
							</div>

							<div className="form-group">
							<button className="btn btn-sm btn-primary" style={{marginRight: 5 + 'px'}} >Search</button>
							<button className="btn btn-sm btn-default">Clear</button>
							 </div>

							</div>
							</div>
							<main className="inbox">
						 	 	<DataTable
							      	columns={aColumns}
							      	initialData={aData}
							      	initialPageLength={5}
							    />
							</main>
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default Analytics;