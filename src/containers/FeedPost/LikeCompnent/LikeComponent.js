import React from 'react';
import './LikeComponent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class LikeComponent extends React.Component{
    state = {
        liked: this.props.liked,
        likes: this.props.likes,
        error:null
    }
    handleLikeclick = (event) =>{
        event.preventDefault();
        const {url,token} = this.props;
        const likePostUrl = url+'like/';
        console.log(likePostUrl);
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.post(likePostUrl,null,header)
        .then((response) => {
            const {liked} = this.state;
            if(liked) {
                // dislike the post
                this.setState({
                    liked:!liked,
                    likes:this.state.likes - 1,
                });
            } else{
                // like the post
                this.setState({
                    liked:!liked,
                    likes:this.state.likes + 1,
                })
            }
        })
        .catch(err => {
            this.setState({error:err});
        });
    }

    render(){
        const {liked, likes} = this.state;
        let likeKeyword = 'likes';
        if(likes === 1) {
            likeKeyword = 'like';
        }

        return (
            <div>
            <div className='buttons'>
                <button className='btn btn-primary m-2' onClick = {this.handleLikeclick}>
                    {liked ?'dislike':'like'}    
                </button>

                {this.props.feedpost ? <Link to={'/p/'+this.props.id} className='btn btn-warning m-2'>comments</Link>:''}
            </div>
            <div className='likesSection'>
                <p>{this.state.likes} {likeKeyword} {this.state.liked ? <b> You liked </b>:''} </p>
            </div>
            </div>
        )
    }
}

export default withErrorHandler(LikeComponent,axios);