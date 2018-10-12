import React from 'react';
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {

	const 	sPath = props.routes.path,
			sIcon = props.routes.icon,
			sName = props.routes.name;

	return (
        <li className='nav-item'>
          	<NavLink 
          		className='nav-link'
      			to={sPath} >
            	<i className={`nav-icon ${sIcon}`}></i> 
            	{sName}
            </NavLink>
        </li>
	);
}

export default MenuItem;