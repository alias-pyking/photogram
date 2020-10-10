import React from 'react';
import axios from '../../axios-insta';
import {connect} from 'react-redux';
import User from '../User/User';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
class FollowNew extends React.Component {
    state ={
        users:[],
        loading:true,
        error:null,
    }
    componentDidMount(){
        const url = 'auth/accounts';
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        };
        axios.get(url,headers)
        .then(response =>{
            this.setState({loading:false,users:response.data });
        })
        .catch(error => {
            this.setState({error:error,loading:false});
        })
    }
    render(){
        let users = <Spinner/>;
        const {loading} = this.state
        if(!loading){
            users = this.state.users.map(user => {
                return <User
                        key = {user.id}
                        follows = {user.follows}
                        user_id = {user.id}
                        profileImg = {user.image}
                        username = {user.userName}
                        />;
            });
        }
        return (
            <div className='row'>
                <div className='col s12 m8'>
                    {users}
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state) => {
    return {
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(withErrorHandler(FollowNew,axios));