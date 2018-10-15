import Login from '../views/Login';
import Register from '../views/register';


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
		redirect: true, 
		path: "/", 
		to: "/login", 
		name: "Login" 
	}
];

export default loginRoutes;