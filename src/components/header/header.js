import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import minimizedlogo from '../../assets/images/sygnet.svg';
import { apiServices } from '../../services/apiServices';

/*import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';*/
class Header extends Component {

	constructor(props){
		super(props);	
		
		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO).community;

		this.logo = community.logo ? community.logo : logo;	
		this.name = community.project ? community.project : 'iMonitor';	
		this.handleLogout = this.handleLogout.bind(this);       
	}    
	
	handleLogout(e){
		e.preventDefault();
		apiServices.logout();		
	}
	
    render() {
        return (
            <header className="app-header navbar">
			 	<button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
	    			<span className="navbar-toggler-icon"></span>
	      		</button>
		      	<a className="navbar-brand" href="javascript:void(0)">
			        <img className="navbar-brand-full" src={this.logo} height="52" alt="CoreUI Logo" />
					<span className="project-title">{this.name}</span>
			        <img className="navbar-brand-minimized" src={minimizedlogo} width="30" height="30" alt="CoreUI Logo" />
	     	 	</a>

		      	<button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
				   <span className="navbar-toggler-icon"></span>
				</button>

				  
					<ul className="nav navbar-nav ml-auto">
						
						<li className="nav-item dropdown">
						<a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
						  <span className="navbar-toggler-icon"></span>
						</a>
						<div className="dropdown-menu dropdown-menu-right">
							<div className="dropdown-header text-center">
							<strong>Account</strong>
							</div>
							
						
							<a className="dropdown-item" href="#">
							<i className="fa fa-user"></i> Profile</a>
							<a className="dropdown-item" href="#">
							<i className="fa fa-wrench"></i> Settings</a>
							
							<div className="divider"></div>
							<a className="dropdown-item" href="#">
							<i className="fa fa-shield"></i> Lock Account</a>
							<a className="dropdown-item" onClick={this.handleLogout} >
							<i className="fa fa-lock"  ></i> Logout</a>
						</div>
						</li>
					</ul>
			</header>
        );
    }
}

export default Header;