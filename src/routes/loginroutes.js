import Login from '../views/Login';


const loginRoutes = [
	{
	    path: "/login",
	    name: "Login",
	    component: Login
  	},
  	{ 
		redirect: true, 
		path: "/", 
		to: "/login", 
		name: "Login" 
	}
];

export default loginRoutes;