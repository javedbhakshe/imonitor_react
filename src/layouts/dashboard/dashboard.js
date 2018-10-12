import React,{Component} from 'react';
import SideBar from '../../components/sidebar/sidebar';
import {Route ,Redirect, Switch } from 'react-router-dom';
import DashboardRoutes from '../../routes/dashboardroutes';
import Header from '../../components/header/header';

class DashBoard extends Component{

	constructor(props){
		super(props);

		this.aMenuRoutes = DashboardRoutes.map((prop,key) => {
			if (prop.redirect){
                return <Redirect from={prop.path} to={prop.to} key={key} />;
			}
          	return (
                <Route path={prop.path} component={prop.component} key={key} />
          	);
		});

	}

	render(){
		return(
			<div className='app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show'>
				<Header />
				<div className='app-body' >
					<SideBar />
					<main className='main'>
						<Switch>
							{this.aMenuRoutes}
						</Switch>
					</main>
				</div>
			</div>
		);
	}
}

export default DashBoard;