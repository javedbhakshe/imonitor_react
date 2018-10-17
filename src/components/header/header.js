import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import minimizedlogo from '../../assets/images/sygnet.svg';
import { apiServices } from '../../services/apiServices';

/*import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';*/
class Header extends Component {

	constructor(props){
		super(props);			
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
		      	<a className="navbar-brand" href="https://web.imonitorplus.com">
			        <img className="navbar-brand-full" src={logo} width="89" height="25" alt="CoreUI Logo" />
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