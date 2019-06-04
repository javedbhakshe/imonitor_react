import Dashboard from '../views/dashboard';
import Inbox from '../views/inbox';
import Charts from '../views/charts';
import Maps from '../views/maps';
import SmartSetUp from '../views/smartsetup';
import Analytics from '../views/analytics';
import Users from '../views/forms/Users';
import Translation from '../views/forms/Translation';
import Pages from '../views/Pages';

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
	    path: "/users",
	    name: "Users",
	    icon: "fa fa-user-circle",
	    component: Users
	},  
	{
	  path: "/translation",
	  name: "Translation",
	  icon: "fa fa-language",
	  component: Translation
  	}, 
	{
	  path: "/pages",
	  name: "Pages",
	  icon: "fa fa-bars",
	  component: Pages
	}, 
	{ 
		redirect: true, 
		path: "/", 
		to: "/dashboard", 
		name: "Dashboard" 
	}
];

export default dashboardRoutes;