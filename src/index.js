import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
/*import DashBoard from './layouts/dashboard/dashboard';*/
import FirstTimeLogin from './views/FirstTimeLogin';
import Login from './views/Login';
import indexRoutes from './routes/indexroutes';
import loginRoutes from './routes/loginroutes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/modal';
import 'bootstrap/js/src/collapse';

import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-data-components/css/table-twbs.css';

import './assets/css/style.css';
// import './assets/css/email.css';
const store = createStore(rootReducer)

class App extends Component{

	constructor(props){
		super(props);

		const communityBO = JSON.parse(localStorage.getItem('community'));
		let firstTimeLogin = true;
		if(communityBO){
			firstTimeLogin = communityBO.identityBO.users.firstTimeLogin;			
		}
		
		this.onLoginSuccess  = this.onLoginSuccess.bind(this);
		this.onFirstTimeLoginSuccess  = this.onFirstTimeLoginSuccess.bind(this);
		this.state = {loggedIn : false, firstTimeLogin: firstTimeLogin};

		/*  */
		this.aIndexRoutes = indexRoutes.map((prop, key) => {
       	 	return <Route to={prop.path} component={prop.component} key={key} />;
		});

		
		this.aLoginRoutes = loginRoutes.map((prop, key) => {
			
			if(prop.redirect){
				return <Redirect from={prop.path} to={prop.to}  key={key}/>;
			}
			if(prop.loggedIn){
				return <Route path={prop.path} render={e => ( this.state.firstTimeLogin && this.state.loggedIn) ? <FirstTimeLogin onSuccess = {this.onFirstTimeLoginSuccess} /> : <Login onSuccess = {this.onLoginSuccess} />} key={key}/>;
			}
   	 		return <Route path={prop.path} component={prop.component} key={key}/>;
		}, this);		

	}
	

	render(){		
		return (
			<HashRouter>
				<Switch>
					{!this.state.firstTimeLogin  ? this.aIndexRoutes : this.aLoginRoutes}
				</Switch>
			</HashRouter>
		);
		
	}

	onLoginSuccess(){
		const communityBO = JSON.parse(localStorage.getItem('community'));
		let firstTimeLogin = true;
		if(communityBO){
			firstTimeLogin = communityBO.identityBO.users.firstTimeLogin;			
		}
		this.setState({loggedIn:true, firstTimeLogin:firstTimeLogin});
	}

	onFirstTimeLoginSuccess(){
		this.setState({loggedIn:false, firstTimeLogin:true});
	}
}

ReactDOM.render(
	<Provider store={store}>
	  <App />
	</Provider>,
	document.getElementById('root')
);

