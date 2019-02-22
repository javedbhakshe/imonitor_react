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
                <Route path={prop.path} render={() => <prop.component testFn={this.testFunc}/>} key={key} />
          	);
		});


		this.state = {menus:[]};

	}

	componentDidMount(){
		// this.computeMenusList(['Setup']);
	}

	testFunc = () => {
		console.log('testFn');
		let aMenus = ['Inbox','Dashboard','Setup'];
		// this.computeMenusList(aMenus);

	}

	computeMenusList = (aMenus) => {
		let i ,j,aFinalRoutes = [];
		for(i in aMenus){
			for(j in DashboardRoutes){
				if(!DashboardRoutes[j].redirect && DashboardRoutes[j].name === aMenus[i]){
					aFinalRoutes.push(DashboardRoutes[j]);
					break;
				}
			}
			if(aMenus.length == aFinalRoutes.length){
				break;
			}
		}
		this.setState({menus : aFinalRoutes});
	}

	/* in place of DashboardRoutes use this.state.menus for menu setup*/
	render(){
		return(
			<div className='app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show'>
				<Header />
				<div className='app-body' >
					<SideBar menus={DashboardRoutes}/>
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