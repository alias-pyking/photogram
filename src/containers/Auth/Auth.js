import React from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
import './Auth.css';
import * as controls from './utility';
import {Redirect} from 'react-router-dom';
import axios from '../../axios-insta';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
class Auth extends React.Component {
    constructor (props) {
        super(props);
        this.state  = {
            controls :{...controls.signUpcontrols},
            isSignUp:true,
            usernameError:false,
            error:null
        }
    }
    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;

    }
    // whenever someinput changes check validation set its value
    inputChangedHandler =(event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true,
            }
        };
        this.setState({controls:updatedControls});
    };

    submitHandler= (event) => {
        event.preventDefault();
        if(this.state.isSignUp) {
            const username = this.state.controls.username.value || null;
            const email = this.state.controls.email.value || null;
            const password = this.state.controls.password.value || null;
            const password2 = this.state.controls.ConfirmPassword.value || null;

            const url = 'check_username/'+username;
            let success = false;
            axios.get(url)
            .then(response =>{
                success = response.data.success;
                if(success){
                    this.setState({usernameError:false})
                    if(username && email && password && password2) {
                        this.props.onAuth(username, email, password, this.state.isSignUp);
                    } else {
                        this.setState({error:'Every field is required!...'});
                    }
                } else{
                    this.setState({usernameError:true})
                }

            })
            .catch(error => {
            });
        } else {
            const username = this.state.controls.username.value || null;
            const password = this.state.controls.password.value || null;
            const isValid = this.state.controls.username.valid && this.state.controls.password.valid;
            if(isValid) {
                if(username && password) {
                    this.props.onAuth(username, null, password, this.state.isSignUp);
                }
                else {
                    this.setState({error:'Every field is required!...'});
                } 
            }
            else {
                this.setState({error:'Incorrect Info'});
            }
        }
        
        
    };
    switchAuthModeHandler= () =>{
        const isSignUp = this.state.isSignUp;
        if(isSignUp) {
            const newControls = {
                ...controls.signInControls,
            };
            this.setState(prevState=>{
                return {
                    controls: newControls,
                    isSignUp: !prevState.isSignUp};
            });
        } else {
            const newControls = {
                ...controls.signUpcontrols
            };
            this.setState(prevState=>{
                return {
                    controls: newControls,
                    isSignUp: !prevState.isSignUp};
            });
        }
        

    }
    componentDidMount(){
        if(this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement =>(
            <Input
                invalid = {!formElement.config.valid}       
                elementtype = {formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                key = {formElement.id}
                shouldValidate={formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
            />

        ));
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        const {isAuth} = this.props;
        if(isAuth){
            authRedirect = <Redirect to = {this.props.authRedirectPath}/>
        }
        return(
            <div className = 'Auth'>
                {authRedirect}
                {errorMessage}

                <form onSubmit={this.submitHandler}>
                    {form}
                    {this.state.usernameError? <p>This username already exists..</p>:''}
                    {this.state.error ? <p>{this.state.error}</p>:''}
                    <Button clicked ={this.submitHandler}  btnType="Success">SIGN {this.state.isSignUp?'UP':'IN'} </Button>
                </form>
                <Button
                clicked = {this.switchAuthModeHandler}
                 btnType="Danger">SWITCH TO {this.state.isSignUp? 'SIGNIN':'SIGNUP'} </Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !== null,
        authRedirectPath : state.auth.authRedirect
    }
}
const maptDispatchtoProps = dispatch => {
    return {
        onAuth : (username, email, password, isSignUp) => {
            return dispatch(actionCreators.auth(username, email, password, isSignUp));
        },
        onSetAuthRedirectPath:()=>dispatch(actionCreators.setAuthRedirect('/')),
    }
}

export default connect(mapStateToProps, maptDispatchtoProps)(withErrorHandler(Auth,axios));