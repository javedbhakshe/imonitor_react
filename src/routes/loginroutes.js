import Login from '../views/Login';
import Register from '../views/register';
import FirstTimeLogin from '../views/FirstTimeLogin';

const loginRoutes = [
	{
	    loggedIn:true,
	    path: "/login",
	    name: "Login",
	    component: Login
  	},
  	{
	    path: "/register",
	    name: "register",
	    component: Register
	},
	{
	    path: "/firstTimeLogin",
	    name: "firstTimeLogin",
	    component: FirstTimeLogin
	},
  	{ 
		redirect: true, 
		path: "/", 
		to: "/login", 
		name: "Login" 
	}
	
];

export default loginRoutes;