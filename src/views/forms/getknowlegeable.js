import React, { Component } from 'react';

class GetKnowlegeable extends Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			data:{},				
			isLoading:false			         
		  }   
		  
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(){
		return(
			<div className="card">
			<div className="card-body">
			<div className="row">			
			<div className="col-lg-12">
			<div className="btn-group ">
                    <button className="btn btn-light" type="button" data-toggle="modal" data-target="#myModal">
    		         		  <span className="fa fa-plus"></span> Add
    	         	    </button>                    
                  </div>
				  <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
						<div className="modal-content">						
						<div>						
							<div className="card-body">							
								<div className="form-group">
								<label className="control-label">Title</label>
								<input className="form-control" id="title" type="text" placeholder="Enter a title ..." />
								</div>
								<div className="form-group">
								<label className="control-label" >Message</label>
								<textarea className="form-control" id="message" rows="6" placeholder="Enter a message ..."></textarea>
								</div>	
							</div>
							<div className="text-center card-footer">
							<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
							<button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
							</div>
							</div>
						</div>
						</div>
					</div>
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
			<div className="text-center card-footer">
			<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
			<button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button>
			</div>
			</div>		           
		);
	}
}

export default GetKnowlegeable;