import Dashboard from '../views/dashboard';
import Inbox from '../views/inbox';
import Charts from '../views/charts';
import Maps from '../views/maps';

const dashboardRoutes = [
	{
	    path: "/dashboard",
	    name: "Dashboard",
	    icon: "cui-dashboard",
	    component: Dashboard
  	},
  	{
	    path: "/inbox",
	    name: "Inbox",
	    icon: "cui-inbox",
	    component: Inbox
  	},
  	{
	    path: "/charts",
	    name: "charts",
	    icon: "icon-pie-chart",
	    component: Charts
  	},
  	{
	    path: "/maps",
	    name: "maps",
	    icon: "icon-map",
	    component: Maps
  	},
  	{ 
		redirect: true, 
		path: "/", 
		to: "/dashboard", 
		name: "Dashboard" 
	}
];

export default dashboardRoutes;