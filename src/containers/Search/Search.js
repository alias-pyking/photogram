import React from 'react';
import axios from '../../axios-insta';
import Spinner from '../../components/UI/Spinner/Spinner';
import User from '../User/User';
import {connect } from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
class Search extends React.Component{
    state ={
        users:[],
        loading:false,
        error:null,
    }
    componentDidMount(){
        const url = 'auth/accounts/search/?q=';
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        };
        this.setState({loading:true});
        axios.get(url,headers)
        .then(response =>{
            this.setState({loading:false,users:response.data });
        })
        .catch(error => {
            this.setState({error:error,loading:false});
        });
    }
    handleOnChange = (event) => {
        const text = event.target.value;
        const url = 'auth/accounts/search/?q='+text;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        };
        this.setState({loading:true});
        axios.get(url,headers)
        .then(response =>{
            this.setState({loading:false,users:response.data });
        })
        .catch(error => {
            this.setState({error:error,loading:false});
        });
    }
    render(){
        let displayUsers = <Spinner/>;
        const {loading} = this.state
        if(!loading){
            const {users} = this.state;
            if(users.length === 0) {
                displayUsers = <h4>No users found</h4>;
            } else {
                displayUsers = this.state.users.map(user => {
                    return <User
                            key = {user.id}
                            follows = {user.follows}
                            user_id = {user.id}
                            profileImg = {user.image}
                            username = {user.username}
                            />;
                });
            }
        }
        return (
            <div className='row'>
                <div className='col s12 m8'>
                    <input placeholder='Search Users ' onChange = { this.handleOnChange } />
                    {displayUsers}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(withErrorHandler(Search,axios));