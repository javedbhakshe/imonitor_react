import React,{Component} from 'react';
import { Card, CardBody, CardHeader, CardTitle,Table,Progress } from 'reactstrap';

class DashBoard extends Component{

	render(){
		return(
			<div className='container-fluid my-4'>
				<div className='row'>
					<div className='col-sm-12 col-md-4 col-lg-4'>
					 	<Card className="text-white bg-info">
					 		<CardBody className="pb-0 mb-4">
					 			<CardTitle>Female</CardTitle>
					 			<i className="icon-user-female"></i>
					 			<div className="text-value">100</div>
                				<div>Members online</div>
					 		</CardBody>
					 	</Card>
					</div>
					<div className='col-sm-12 col-md-4 col-lg-4'>
						<Card className="text-white bg-primary">
					 		<CardBody className="pb-0 mb-4">
					 			<CardTitle>Male</CardTitle>
					 			<i className="icon-user"></i>
					 			<div className="text-value">50</div>
                				<div>Members online</div>
					 		</CardBody>
					 	</Card>
					</div>
					<div className='col-sm-12 col-md-4 col-lg-4'>
						<Card className="text-white bg-warning">
					 		<CardBody className="pb-0 mb-4">
				 				<CardTitle>Total</CardTitle>
					 			<i className="icon-settings"></i>
					 			<div className="text-value">150</div>
                				<div>Members online</div>
					 		</CardBody>
					 	</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-12'>
						<Card>
			              	<CardHeader>
				                User info
			              	</CardHeader>
		              	 	<CardBody>
	              	 			<Table hover responsive className="table-outline mb-0 d-none d-sm-table">
				                  	<thead className="thead-light">
					                  <tr>
				                    	<th className="text-center"><i className="icon-people"></i></th>
						                    <th>User</th>
						                    <th className="text-center">Country</th>
						                    <th>Usage</th>
						                    <th>Activity</th>
				                  		</tr>
				                  	</thead>
				                  	<tbody>
					                  	<tr>
						                    <td className="text-center">
						                      <div className="avatar">
						                        	<img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							                        <span className="avatar-status badge-success"></span>
						                      </div>
						                    </td>
						                    <td>
						                      <div>Yiorgos Avraamu</div>
						                      <div className="small text-muted">
						                        	<span>New</span> | Registered: Jan 1, 2015
						                      </div>
						                    </td>
						                    <td className="text-center">
						                      	<i className="flag-icon flag-icon-in h4 mb-0" title="us" id="us"></i>
						                    </td>
						                    <td>
						                      <div className="clearfix">
						                        <div className="float-left">
						                          	<strong>100%</strong>
						                        </div>
						                        <div className="float-right">
						                          	<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						                        </div>
						                      </div>
						                      <Progress className="progress-xs" color="success" value="100" />
						                    </td>
						                    <td>
						                      	<div className="small text-muted">Last login</div>
					                     	 	<strong>10 sec ago</strong>
						                    </td>
					                  	</tr>
					                  	<tr>
						                    <td className="text-center">
						                      <div className="avatar">
						                        	<img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							                        <span className="avatar-status badge-success"></span>
						                      </div>
						                    </td>
						                    <td>
						                      <div>Yiorgos Avraamu</div>
						                      <div className="small text-muted">
						                        	<span>New</span> | Registered: Jan 1, 2015
						                      </div>
						                    </td>
						                    <td className="text-center">
						                      	<i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
						                    </td>
						                    <td>
						                      <div className="clearfix">
						                        <div className="float-left">
						                          	<strong>50%</strong>
						                        </div>
						                        <div className="float-right">
						                          	<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						                        </div>
						                      </div>
						                      <Progress className="progress-xs" color="success" value="50" />
						                    </td>
						                    <td>
						                      	<div className="small text-muted">Last login</div>
					                     	 	<strong>10 sec ago</strong>
						                    </td>
					                  	</tr>
					                  	<tr>
						                    <td className="text-center">
						                      <div className="avatar">
						                        	<img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							                        <span className="avatar-status badge-success"></span>
						                      </div>
						                    </td>
						                    <td>
						                      <div>Yiorgos Avraamu</div>
						                      <div className="small text-muted">
						                        	<span>New</span> | Registered: Jan 1, 2015
						                      </div>
						                    </td>
						                    <td className="text-center">
						                      	<i className="flag-icon flag-icon-sa h4 mb-0" title="us" id="us"></i>
						                    </td>
						                    <td>
						                      <div className="clearfix">
						                        <div className="float-left">
						                          	<strong>100%</strong>
						                        </div>
						                        <div className="float-right">
						                          	<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						                        </div>
						                      </div>
						                      <Progress className="progress-xs" color="success" value="100" />
						                    </td>
						                    <td>
						                      	<div className="small text-muted">Last login</div>
					                     	 	<strong>10 sec ago</strong>
						                    </td>
					                  	</tr>
					                  	<tr>
						                    <td className="text-center">
						                      <div className="avatar">
						                        	<img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							                        <span className="avatar-status badge-success"></span>
						                      </div>
						                    </td>
						                    <td>
						                      <div>Yiorgos Avraamu</div>
						                      <div className="small text-muted">
						                        	<span>New</span> | Registered: Jan 1, 2015
						                      </div>
						                    </td>
						                    <td className="text-center">
						                      	<i className="flag-icon flag-icon-tr h4 mb-0" title="us" id="us"></i>
						                    </td>
						                    <td>
						                      <div className="clearfix">
						                        <div className="float-left">
						                          	<strong>100%</strong>
						                        </div>
						                        <div className="float-right">
						                          	<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						                        </div>
						                      </div>
						                      <Progress className="progress-xs" color="success" value="100" />
						                    </td>
						                    <td>
						                      	<div className="small text-muted">Last login</div>
					                     	 	<strong>10 sec ago</strong>
						                    </td>
					                  	</tr>
					                  	<tr>
						                    <td className="text-center">
						                      <div className="avatar">
						                        	<img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
							                        <span className="avatar-status badge-success"></span>
						                      </div>
						                    </td>
						                    <td>
						                      <div>Yiorgos Avraamu</div>
						                      <div className="small text-muted">
						                        	<span>New</span> | Registered: Jan 1, 2015
						                      </div>
						                    </td>
						                    <td className="text-center">
						                      	<i className="flag-icon flag-icon-ug h4 mb-0" title="us" id="us"></i>
						                    </td>
						                    <td>
						                      <div className="clearfix">
						                        <div className="float-left">
						                          	<strong>100%</strong>
						                        </div>
						                        <div className="float-right">
						                          	<small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
						                        </div>
						                      </div>
						                      <Progress className="progress-xs" color="success" value="100" />
						                    </td>
						                    <td>
						                      	<div className="small text-muted">Last login</div>
					                     	 	<strong>10 sec ago</strong>
						                    </td>
					                  	</tr>
				                  	</tbody>
                  				</Table>
		              	 	</CardBody>
		              	</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default DashBoard;