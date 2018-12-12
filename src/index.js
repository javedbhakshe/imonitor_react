import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
/*import DashBoard from './layouts/dashboard/dashboard';*/
import Login from './views/Login';
import indexRoutes from './routes/indexroutes';
import loginRoutes from './routes/loginroutes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/modal';

import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'react-data-components/css/table-twbs.css';

import './assets/css/style.css';
// import './assets/css/email.css';

class App extends Component{

	constructor(props){
		super(props);
		this.onLoginSuccess  = this.onLoginSuccess.bind(this);
		this.state = {loggedIn : false};

		/*  */
		this.aIndexRoutes = indexRoutes.map((prop, key) => {
       	 	return <Route to={prop.path} component={prop.component} key={key} />;
		});

		this.aLoginRoutes = loginRoutes.map((prop, key) => {
			
			if(prop.redirect){
				return <Redirect from={prop.path} to={prop.to}  key={key}/>;
			}
			if(prop.loggedIn){
				return <Route path={prop.path} render={e => <Login onSuccess = {this.onLoginSuccess} />} key={key}/>;
			}
   	 		return <Route path={prop.path} component={prop.component} key={key}/>;
		});

	}

	render(){
		const community = localStorage.getItem('community');

		return (
			<HashRouter>
				<Switch>
					{community  ? this.aIndexRoutes : this.aLoginRoutes}
				</Switch>
			</HashRouter>
		);
		
	}

	onLoginSuccess(){
		this.setState({loggedIn:true});
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

