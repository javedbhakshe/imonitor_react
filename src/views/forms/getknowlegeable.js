import React, { Component } from 'react';

class GetKnowlegeable extends Component{
	render(){
		return(
			<div class="card">
			<div className="card-body">
			<div className="row">
			<div className="col-lg-4">
			<div class="card">
			<div className="card-body">
				<div className="form-group">
				<label className="control-label" for="title">Title</label>
				<input className="form-control" id="title" type="text" placeholder="Enter a title ..." />
				</div>
				<div className="form-group">
				<label className="control-label" for="message">Message</label>
				<textarea className="form-control" id="message" rows="6" placeholder="Enter a message ..."></textarea>
				</div>	
			</div>
			<div class="text-center card-footer">
			<button type="submit" class="mr-3 btn btn-primary btn-sm"><i class="fa fa-plus"></i> Add </button>
			<button type="reset" class="btn btn-danger btn-sm"><i class="fa fa-ban "></i> Reset</button>
			</div>
			</div>
			</div>
			<div className="col-lg-8">
			<table className="table table-responsive-sm table-bordered table-striped">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>How can TB be prevented from transmitting? </td>
						<td>The best way to prevent TB from transmitting to other people is to start treatment early. After 2 weeks of treatment TB bacteria can no longer be transmitted to others.</td>
						<td>
						    <span className="badge badge-success">Edit</span>
							<span className="badge badge-danger">Delete</span>
						</td>
					</tr>
					<tr>
						<td>Why do some patients die even if they are on treatment?</td>
						<td>They might have started treatment too late. Due to the delay in treatment their body will be weak</td>
						<td>
						    <span className="badge badge-success">Edit</span>
							<span className="badge badge-danger">Delete</span>
						</td>
					</tr>
					<tr>
						<td>When can I get back to my usual routine of work and daily activities?</td>
						<td>When you feel strong enough you can go back to work and daily activities. Be careful at the beginning and start with very light work. Remember your body needs rest to recover.</td>
						<td>
						    <span className="badge badge-success">Edit</span>
							<span className="badge badge-danger">Delete</span>
						</td>
					</tr>
				</tbody>
			</table>
			</div>
			</div>
			</div>
			<div class="text-center card-footer">
			<button type="submit" class="mr-3 btn btn-primary btn-sm"><i class="fa fa-dot-circle-o"></i> Save and Continue </button>
			<button type="reset" class="btn btn-danger btn-sm"><i class="fa fa-ban "></i> Reset</button>
			</div>
			</div>		           
		);
	}
}

export default GetKnowlegeable;