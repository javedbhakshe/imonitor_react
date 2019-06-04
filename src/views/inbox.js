import React,{Component} from 'react';

class Inbox extends Component{

	render(){
		return(			
			<div className='container-fluid  my-4'>
				<div id="ui-view">
					<div><div className="animated fadeIn">
						<div className="email-app mb-4">
							<nav>
							   	 
							   	<ul className="nav" id="exampleAccordion" data-children=".item">
							      	<li className="nav-item item">
									  <a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion1" aria-expanded="true" aria-controls="exampleAccordion1" className="nav-link"><i className="fa fa-inbox"></i> Open <span className="badge badge-dark">4</span></a>
									  <div className="collapse show" id="exampleAccordion1" role="tabpanel">
									  <div className="list-group">
										<a className="list-group-item list-group-item-action flex-column align-items-start active" href="javascript:void(0)">
											<div className="d-flex w-100 justify-content-between">
											<h5 className="mb-1">CFMKN_02</h5>
											<small>#21222</small>
											</div>
											<small>Donec id elit non mi porta.</small>
										</a>
										<a className="list-group-item list-group-item-action flex-column align-items-start" href="javascript:void(0)">
											<div className="d-flex w-100 justify-content-between">
											<h5 className="mb-1">List group item heading</h5>
											<small className="text-muted">3 days ago</small>
											</div>
											<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
											<small className="text-muted">Donec id elit non mi porta.</small>
										</a>
										<a className="list-group-item list-group-item-action flex-column align-items-start" href="javascript:void(0)">
											<div className="d-flex w-100 justify-content-between">
											<h5 className="mb-1">List group item heading</h5>
											<small className="text-muted">3 days ago</small>
											</div>
											<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
											<small className="text-muted">Donec id elit non mi porta.</small>
										</a>
										</div>
									  </div>
									  </li>
							      	<li className="nav-item item">
									  <a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion2" aria-expanded="false" aria-controls="exampleAccordion2" className="nav-link"><i className="fa fa-bookmark"></i> Approved<span className="badge badge-primary">5</span></a>
									  <div className="collapse" id="exampleAccordion2" role="tabpanel">
										<p className="mb-3">Donec at ipsum dignissim, rutrum turpis scelerisque, tristique lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus nec dui turpis. Orci varius natoque penatibus et magnis
											dis parturient montes, nascetur ridiculus mus.</p>
										</div>
									  </li>
									  <li className="nav-item item">
									  <a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion3" aria-expanded="false" aria-controls="exampleAccordion3" className="nav-link"><i className="fa fa-inbox"></i> Resolved <span className="badge badge-danger">4</span></a>
									  <div className="collapse" id="exampleAccordion3" role="tabpanel">
										<p className="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium lorem non vestibulum scelerisque. Proin a vestibulum sem, eget tristique massa. Aliquam lacinia rhoncus nibh quis ornare.</p>
									  </div>
									  </li>
							      	<li className="nav-item item">
									  <a data-toggle="collapse" data-parent="#exampleAccordion" href="#exampleAccordion4" aria-expanded="false" aria-controls="exampleAccordion4" className="nav-link"><i className="fa fa-bookmark"></i> Reject<span className="badge badge-success">5</span></a>
									  <div className="collapse" id="exampleAccordion4" role="tabpanel">
										<p className="mb-3">Donec at ipsum dignissim, rutrum turpis scelerisque, tristique lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus nec dui turpis. Orci varius natoque penatibus et magnis
											dis parturient montes, nascetur ridiculus mus.</p>
										</div>
									  </li>
							      	</ul>
							</nav>
							<main className="inbox">
							   <div className="toolbar">
							      	<div className="btn-group">
							         	<button className="btn btn-light" type="button">
							         		<span className="fa fa-envelope"></span>
							         	</button>
							         	<button className="btn btn-light" type="button">
							         		<span className="fa fa-star"></span>
							         	</button>
							         	<button className="btn btn-light" type="button">
							         		<span className="fa fa-star-o"></span>
							         	</button>
							         	<button className="btn btn-light" type="button">
							         		<span className="fa fa-bookmark-o"></span>
							         	</button>
							      	</div>
							      
							      	<button className="btn btn-light" type="button">
							      		<span className="fa fa-trash-o"></span>
							      	</button>
							      	
							      	<div className="btn-group">
							         	<button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
								         	<span className="fa fa-tags"></span>
								         	<span className="caret"></span>
						        	 	</button>
							         	<div className="dropdown-menu">
								            <a className="dropdown-item" href="javascript:void(0)">add label
								            	<span className="badge badge-danger"> Home</span>
								            </a>
								            <a className="dropdown-item" href="javascript:void(0)">add label
								            	<span className="badge badge-info"> Job</span>
								            </a>
								            <a className="dropdown-item" href="javascript:void(0)">add label
								            	<span className="badge badge-success"> Clients</span>
								            </a>
								            <a className="dropdown-item" href="javascript:void(0)">add label
								            	<span className="badge badge-warning"> News</span>
								            </a>
							         	</div>
							      	</div>
							      	<div className="btn-group float-right">
							         	<button className="btn btn-light" type="button">
								         	<span className="fa fa-chevron-left"></span>
							         	</button>
							         	<button className="btn btn-light" type="button">
								        	 <span className="fa fa-chevron-right"></span>
							         	</button>
							      	</div>
							   </div>
							   <ul className="messages">
							      <li className="message unread">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-map-marker"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> 16th Oct 2018</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">

							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3819</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> 10th Oct 2018</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3700</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> 9th Oct 2018</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message unread">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> 5th Oct 2018</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> 3rd Oct 2018</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message unread">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							      <li className="message">
							         <a href="javascript:void(0)">
							            <div className="actions">
							               <span className="action">
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Case #3810</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Wagle Estate Thane west</div>
							            <div className="description">
							            	<p>Case Raised by: Application : 45678</p>
							            	<p>Case Type : Medical Stock Out</p>
							            	<p>Remarks : Visited the TB center for medicine s- No Stock Available</p>
							            </div>
							            <div className="btn-group">
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-video-camera"></span>
								         	</button>
								         	<button className="btn btn-light" type="button">
								         		<span className="fa fa-headphones"></span>
								         	</button>
								      	</div>
							         </a>
							      </li>
							   </ul>
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