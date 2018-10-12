import React,{Component} from 'react';
import DashBoardRoutes from '../../routes/dashboardroutes';
import MenuItem from './menuitem';

class SideBar extends Component{

	constructor(props){
		super(props);
		this.aMenuLinks = DashBoardRoutes.map((prop,key) => {
			if(!prop.redirect){
				return(
					<MenuItem 
						key = {key}
						routes = {prop}
					/>
				);
			}
			return null;
		});	
	}

	render(){
		return(
			<div className="sidebar">
        		<nav className="sidebar-nav">
          			<ul className="nav">
          				{this.aMenuLinks}
          			</ul>
      			</nav>
  			</div>
		);
	}
}

export default SideBar;