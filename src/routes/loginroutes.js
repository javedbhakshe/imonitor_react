import Login from '../views/Login';
import Register from '../views/register';
import FirstTimeLogin from '../views/FirstTimeLogin';
import ForgotPassword from '../views/ForgotPassword';

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
	    path: "/forgotPassword",
	    name: "forgotPassword",
	    component: ForgotPassword
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