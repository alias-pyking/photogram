import React from 'react';
import {post} from 'axios';
import { connect } from 'react-redux';
import './AddPost.css';
class AddPost extends React.Component{

    state = {
        image:null,
        caption:"",
        submitting:false,
        error:null,
        previewImg:null,
    }


    handleOnChange =(event,type) => {
        switch(type){
            case 'file':
                this.setState({image:event.target.files[0], previewImg:URL.createObjectURL(event.target.files[0])});
                break;
            case 'caption':
                this.setState({caption:event.target.value });
                break;
            default:
                break;
        }
    }


    handleSubmit = (event) =>{
        event.preventDefault();
        const {image, caption} = this.state;
        if(!image) {
            this.setState({error:"image is required"});
        } else if(!caption) {
            this.setState({error:'caption is required'});
        } else {
            const fileType = image.type;
            const allowedTypes = ['image/jpeg','image/gif','image/png','image/jpg','image/x-png'];
            if(allowedTypes.includes(fileType)) {
                this.setState({submitting:true});
                this.add(caption, image)
                .then(response => {
                    console.log(response.data);
                    this.setState({submitting:false});
                    const {id} = response.data;
                    this.props.history.push('/p/'+id);
                })
                .catch(error => {
                    console.log(error);
                });
            } else{
                this.setState({error:"File type not allowed"})
            }
            
        }
    }


    add(caption, image){
        const{token} = this.props;
        const profileEditUrl = `https://instaclone.pythonanywhere.com/api/add_post/`;
        const formData = new FormData();
        formData.append('caption',caption);
        formData.append('image',image);
        const config = {
            headers: {
                Authorization:`token ${token}`
            }
        }
        return post(profileEditUrl, formData,config);
    }
        
        
    render() {
        return(
            <div className='col card p-3'>
                <h3>Add new post</h3>
                <form onSubmit = {this.handleSubmit}>
                    <div className='form-group'>
                    <label htmlFor='imageInput'>Image</label>
                        <input required 
                            id='imageInput'
                            className='form-control-file'
                            type='file' 
                            onChange = {(event) => this.handleOnChange(event,'file')} /> 
                        { this.state.previewImg ?<div>
                            <img src={this.state.previewImg} alt='preview' className='img-rounded-sm m-2' /> <br></br>
                            <b>Preview of the choosen image.</b>
                            </div>:''}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='captionTextArea'>Caption</label>
                        <textarea 
                        id='captionTextArea'
                        className='form-control'
                        maxLength = {250} value = {this.state.caption} 
                        onChange = { (event) => this.handleOnChange(event,'caption')}/>
                    </div>
                    {this.state.error ? <p className='alert alert-danger'> {this.state.error} </p>:''}
                    <button
                        disabled={this.state.submitting ? true:false}
                        className="btn btn-success"
                        type="submit"
                        name="action">

                    {this.state.submitting?'Submiting...':'Submit '}

                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token:state.auth.token,
    }
}


export default connect(mapStateToProps)(AddPost);