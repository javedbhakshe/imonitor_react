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


		this.state = {menus:[],sideBarClass:''};

	}
	/*

	*/
	toggleSideBar = (e) =>{
		let sClass = '';
		if(!this.state.sideBarClass){
			sClass = window.innerWidth < 992 ? 'open-sidebar' : 'close-sidebar'; 
		}else{
			sClass = this.state.sideBarClass === 'open-sidebar' ? 'close-sidebar' : 'open-sidebar'; 
		}
		this.setState({
			sideBarClass:sClass
		});
	}
	/*

	*/
	componentDidMount(){
		let communityBO = JSON.parse(localStorage.getItem('community')),
			community = communityBO.community,oSections,aMenus = ['Setup'];
		if(community.key_value_pairs){
			oSections = JSON.parse(community.key_value_pairs);
			let dashboardData = oSections.dashboard;
			for(let i in dashboardData){
				aMenus.push(dashboardData[i].value);
			}
		}
		this.computeMenusList(aMenus);

		/* 
			window resize event 
		*/

		// window.addEventListener('resize',this.handleWindowResize)

	}

	/* 
	*/
	/*componentWillUnmount = () =>{
		window.removeEventListener('resize',this.handleWindowResize);
	}*/
	/* 
		
	*/
	handleWindowResize = (e) =>{
		console.log(e.target.innerWidth);
	}

	/*

	*/

	testFunc = (aMenus) => {
		console.log(aMenus);
		
		this.computeMenusList(aMenus);
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
			if(aMenus.length === aFinalRoutes.length){
				break;
			}
		}

		this.setState({menus : aFinalRoutes});
	}

	render(){
		return(
			<div className='app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show'>
				<Header 
					toggleSideBar={this.toggleSideBar}
				/>
				<div className='app-body' >
					<SideBar 
						menus={this.state.menus}
						className={this.state.sideBarClass}
					/>
					<main className={`main ${this.state.sideBarClass}`}>
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