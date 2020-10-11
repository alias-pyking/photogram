import React from 'react';
import NavBarItem from './NavBarItem/NavBarItem';
// import SearchBar from '../../../containers/Search/Search';


const NavBar = (props) => {
    return (
        <div className='container'>
        <nav className=' container navbar navbar-expand-lg navbar-dark fixed-top bg-dark'>
            <ul className='nav text-center nav-pills'>
                <NavBarItem path='/' name='home'/>
                <NavBarItem path='/new' name='plus-circle' />
                <NavBarItem path='/explore' name='compass'/>
                <NavBarItem path = '/profile' name='user' />
                <NavBarItem path='/acc' name='user-plus' />
                <NavBarItem path='/search' name='search'/>
            </ul>
        </nav> 
        <br></br>
        <br></br>
        <br></br>
        </div>
       
    );
};

export default NavBar;
