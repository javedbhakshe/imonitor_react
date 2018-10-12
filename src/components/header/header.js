import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import minimizedlogo from '../../assets/images/sygnet.svg';
/*import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';*/
class Header extends Component {

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
			</header>
        );
    }
}

export default Header;