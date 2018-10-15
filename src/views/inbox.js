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
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-star"></i> Stared</a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-rocket"></i> Sent</a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-trash-o"></i> Trash</a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-bookmark"></i> Important<span className="badge badge-info">5</span></a></li>
							      	<li className="nav-item"><a href="#" className="nav-link"><i className="fa fa-exclamation-circle"></i> Spam <span className="badge badge-danger">4</span></a></li>
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
							               <i className="fa fa-square-o"></i>
							               </span>
							               <span className="action">
							               <i className="fa fa-star-o"></i>
							               </span>
							            </div>
							            <div className="header">
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">
							               <span className="fa fa-paper-clip"></span> Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
							               <span className="from">Lukasz Holeczek</span>
							               <span className="date">Today, 3:47 PM</span>
							            </div>
							            <div className="title">Lorem ipsum dolor sit amet.</div>
							            <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
							               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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