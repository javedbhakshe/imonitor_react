import Dashboard from '../views/dashboard';
import Inbox from '../views/inbox';
import Charts from '../views/charts';
import Maps from '../views/maps';
import SmartSetUp from '../views/smartsetup';
import Analytics from '../views/analytics';


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
	    name: "Charts",
	    icon: "icon-pie-chart",
	    component: Charts
  	},
  	{
	    path: "/maps",
	    name: "Maps",
	    icon: "icon-map",
	    component: Maps
  	},
  	{
	    path: "/smartsetup",
	    name: "Setup",
	    icon: "fa fa-cog",
	    component: SmartSetUp
	},
	{
	    path: "/analytics",
	    name: "Analytics",
	    icon: "fa fa-pie-chart",
	    component: Analytics
  	},  
  	{ 
		redirect: true, 
		path: "/", 
		to: "/dashboard", 
		name: "Dashboard" 
	}
];

export default dashboardRoutes;