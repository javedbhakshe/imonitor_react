import React,{Component} from 'react';

class Inbox extends Component{

	render(){
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
							<table className="table table-responsive-sm table-bordered table-striped">
							<thead>
							<tr>
							<th>Username</th>
							<th>Date registered</th>
							<th>Role</th>
							<th>Status</th>
							</tr>
							</thead>
							<tbody>
							<tr>
							<td>Samppa Nori</td>
							<td>2012/01/01</td>
							<td>Member</td>
							<td>
							<span className="badge badge-success">Active</span>
							</td>
							</tr>
							<tr>
							<td>Estavan Lykos</td>
							<td>2012/02/01</td>
							<td>Staff</td>
							<td>
							<span className="badge badge-danger">Banned</span>
							</td>
							</tr>
							<tr>
							<td>Chetan Mohamed</td>
							<td>2012/02/01</td>
							<td>Admin</td>
							<td>
							<span className="badge badge-secondary">Inactive</span>
							</td>
							</tr>
							<tr>
							<td>Derick Maximinus</td>
							<td>2012/03/01</td>
							<td>Member</td>
							<td>
							<span className="badge badge-warning">Pending</span>
							</td>
							</tr>
							<tr>
							<td>Friderik Dávid</td>
							<td>2012/01/21</td>
							<td>Staff</td>
							<td>
							<span className="badge badge-success">Active</span>
							</td>
							</tr>
							<tr>
							<td>Samppa Nori</td>
							<td>2012/01/01</td>
							<td>Member</td>
							<td>
							<span className="badge badge-success">Active</span>
							</td>
							</tr>
							<tr>
							<td>Estavan Lykos</td>
							<td>2012/02/01</td>
							<td>Staff</td>
							<td>
							<span className="badge badge-danger">Banned</span>
							</td>
							</tr>
							<tr>
							<td>Chetan Mohamed</td>
							<td>2012/02/01</td>
							<td>Admin</td>
							<td>
							<span className="badge badge-secondary">Inactive</span>
							</td>
							</tr>
							<tr>
							<td>Derick Maximinus</td>
							<td>2012/03/01</td>
							<td>Member</td>
							<td>
							<span className="badge badge-warning">Pending</span>
							</td>
							</tr>
							<tr>
							<td>Friderik Dávid</td>
							<td>2012/01/21</td>
							<td>Staff</td>
							<td>
							<span className="badge badge-success">Active</span>
							</td>
							</tr>
							</tbody>
							</table>
							</main>
						</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

export default Inbox;