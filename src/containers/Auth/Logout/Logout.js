import React ,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-insta';
class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return(
            <Redirect to ='/auth'/>
        );
    }
}
const mapDispatchToProps =(dispatch)=>{
    return {
        onLogout:()=> dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(withErrorHandler(Logout,axios));