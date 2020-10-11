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
        
        const styles = {
            maxHeight:'80vh'
        }

        let displayPost = <Spinner/>;
        let displayComments = <Spinner/>
        const {token} = this.props;
        const {postLoading,commentLoading, error} = this.state;
        let header = <p>.</p>;
        let like = <></>;


        if(!postLoading) {
            const {post}  = this.state;

            header = <Header user_id = {post.user_id} authorImg = {post.userProfileImage} username = {post.userName} />;

            like = (<Like
                        token = {token}
                        url = {post.url}
                        id = {post.id}
                        likes = {post.likes}
                        liked = {post.liked}/>);

            displayPost = (
                <div className='card'>
                    <img src={post.image} className='card-img-top' alt={post.caption} style={styles}/>
                    
                    <div className='card-body'>
                        <p> <b>{post.userName}</b>  {post.caption}</p>
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
                <div className='col-lg-8'>
                    {displayPost}
                </div> 
                <div className='col-lg-4'> 
                    <div className='card'>
                        {header}
                    </div>
                    <div className='card m-2 commentList'>
                        {displayComments}   
                    </div>
                    {like}
                    <form>
                        <textarea 
                        onChange={this.onTextAreaChange}
                        className='card addCommentTextArea'
                        placeholder='Add a comment'
                        value={this.state.addCommentText}
                        />
                        
                        {error ? <p className='alert alert-danger alert-dismissible'>{error}</p>:''}

                        <button
                        onClick={this.submitCommentForm}
                        className='btn btn-primary btn-block' 
                        type='submit'
                        >   
                        {this.state.postingComment? 'posting...':'Post '}
                        <i className='fas fa-paper-plane'></i>
                        </button>
                    </form>
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