import React from 'react';
import {NavLink} from 'react-router-dom';
const navBarItem = props => {
    return (
        <li className='nav-item'>
            <NavLink
            exact={true}
            className='nav-link'
            to={props.path}>
                <i className={'fas fa-'+props.name}></i>
            </NavLink>
        </li>
    );
};

export default navBarItem;