import React from 'react';
import axios from '../../axios-insta';
import './Fullpost.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Header from '../../components/Header/header';
import Like from './Like/Like';
import Comment from './Comment/Comment';
import {connect} from 'react-redux';
class FullPost extends React.Component{
    state = {
        postLoading:true,
        post:{},
        comments:[],
        commentLoading:true,
        addCommentText:'',
        postingComment:false,
        error:null,
    }
    componentDidMount(){
        const {token} = this.props;
        console.log(token);
        const {id} = this.props.match.params;
        const postUrl = `${id}`
        const commentsUrl = id+"/comments";
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(postUrl, header)
        .then(response =>{
            console.log(response.data);
            this.setState({
                postLoading:false,
                post:response.data,
            });
        })
        .catch(error =>{
            console.log(error);
        })
        axios.get(commentsUrl,header)
        .then(response => {
            console.log(response.data);
            this.setState({
                comments:response.data,
                commentLoading:false
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }
    onTextAreaChange = event =>{
        const newCommentText = event.target.value;
        if(newCommentText.length > 0){
            this.setState({addCommentText:newCommentText,error:null});
        } else{
            this.setState({addCommentText:'',})
        }
    }
    submitCommentForm = event =>{
        event.preventDefault();
        const comment = this.state.addCommentText;
        if(comment.length === 0){
            this.setState({error:"Please add some text..."});
        } else {
            this.setState({postingComment:true});
            const {id} = this.props.match.params;
            const {token} = this.props;
            const commentText = this.state.addCommentText;
            const addCommentUrl = id +'/comments/add_comment/';
            console.log(addCommentUrl);
            const data = {
                text:commentText
            }
            const headers = {
                headers:{'Authorization': `token ${token}`},
            }
            axios.post(addCommentUrl,data,headers)
            .then( response =>{
                console.log(response.data);
                const newComment = response.data;
                const oldComments = this.state.comments;
                const newComments = [...oldComments,newComment];
                this.setState({
                    comments:newComments,
                    addCommentText:'',
                    postingComment:false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    postingComment:false,
                })
            })
        }
    }
    render(){
        let displayPost = <Spinner/>;
        let displayComments = <Spinner/>
        const {token} = this.props;
        const {postLoading,commentLoading, error} = this.state;
        let header = <p>.</p>;
        let like = <></>;
        if(!postLoading) {
            const {post}  = this.state;
            header = <Header user_id = {post.user_id} authorImg = {post.userProfileImage} username = {post.userName} />;
            like = (<div className='card-action'>
                            <Like
                                token = {token}
                                url = {post.url}
                                id = {post.id}
                                likes = {post.likes}
                                liked = {post.liked}/>
                        </div>);
            displayPost = (
                <div className='col s12 m6 l6'>
                <div className='card'>
                    <div className='lowerSection'>
                        <div className='card-image'>
                            <img src={post.image} className='responsive-img' alt={post.caption}/>
                        </div>
                        
                        <div className='footer card-content'>
                            <p> <b>{post.userName}</b>  {post.caption}</p>
                        </div>
                    </div>
                </div>
                </div>
            );
        }
        if(!commentLoading) {
            displayComments = this.state.comments.map((comment,index)=>{
                return(
                    <Comment
                    key={index}
                    profileImg={comment.urlToProfileImage}
                    username = {comment.userName}
                    user_id = {comment.user_id}
                    comment = {comment.text}
                    />
                )
            });
        }
        return(
            <div className='row'>

                        {displayPost}
                    
                    <div className='col s12 m6 l6 commentSection'> 
                        <div className='commentHead'>
                            {header}
                        </div>
                        <div className='commentsList'>
                            {displayComments}   
                        </div>
                        {like}
                        <div className='addComment'>
                            <form>
                                <textarea 
                                onChange={this.onTextAreaChange}
                                className='addCommentTextArea'
                                placeholder='Add a comment'
                                value={this.state.addCommentText}
                                />
                                
                                {error ? <p className='errorText'>{error}</p>:''}

                                <button
                                onClick={this.submitCommentForm}
                                className='blue btn waves-effect waves-light' 
                                type='submit'
                                >
                                {this.state.postingComment? 'posting...':'Post'}
                                <i className='material-icons right'>send</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token : state.auth.token,
    }
}
export default  connect(mapStateToProps)(FullPost);