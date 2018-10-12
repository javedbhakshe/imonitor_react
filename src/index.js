import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route , Switch } from 'react-router-dom';
import DashBoard from './layouts/dashboard/dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';

import './assets/css/style.css';
// import './assets/css/email.css';

class App extends Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path="/" component={ DashBoard }  />
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

