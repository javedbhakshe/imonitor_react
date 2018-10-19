import React,{Component} from 'react';

class Inbox extends Component{

	render(){
		return(			
			<div className='container-fluid  my-4'>
				<div id="ui-view">
					<div><div className="animated fadeIn">
						<div className="email-app mb-4">
							<nav>
							   	<a href="#/apps/email/compose" className="btn btn-danger btn-block">New Email</a>
							   	<ul className="nav">
							      	<li className="nav-item"><a href="#/apps/email/inbox" className="nav-link"><i className="fa fa-inbox"></i> Inbox <span className="badge badge-danger">4</span></a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-bookmark"></i> Resolved<span className="badge badge-info">5</span></a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-exclamation-circle"></i> Invalid <span className="badge badge-danger">4</span></a></li>
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
								            <a className="dropdown-item" href="#">add label
								            	<span className="badge badge-danger"> Home</span>
								            </a>
								            <a className="dropdown-item" href="#">add label
								            	<span className="badge badge-info"> Job</span>
								            </a>
								            <a className="dropdown-item" href="#">add label
								            	<span className="badge badge-success"> Clients</span>
								            </a>
								            <a className="dropdown-item" href="#">add label
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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
							         <a href="#">
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