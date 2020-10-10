import React from 'react';
import './Layout.css';
import {connect} from 'react-redux';
import NavBar from '../Navigation/NavBar/NavBar';
import Aux from '../../containers/hoc/Auxiliary';

const layout = (props) => {
    return (
        <Aux>
            <NavBar/>
            <div className='container'>

                {props.children}

            </div>
        </Aux>  
    );
}
const mapStateToProps = (state) =>{
    return {
        isAuth:state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(layout);