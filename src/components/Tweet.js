import React, {Component} from 'react';
import {connect} from 'react-redux'
import {formatTweet, formatDate} from '../utils/helpers'
import {TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline} from "react-icons/all";
import {handleToggleTweet} from "../actions/tweets";

class Tweet extends Component {
    constructor(props){
        super(props)
        this.handleLike = this.handleLike.bind(this)
    }

    toParent(event, id){
        event.preventDefault();
        //todo: Redirect to parent tweet
    }

    handleLike(event){
        event.preventDefault();
        const{dispatch,tweet,authedUser}=this.props
        //todo: Handle like tweet
        dispatch(handleToggleTweet({id:tweet.id,hasLiked:tweet.hasLiked,authedUser}))

    }

    render(){

        console.log("props: ", this.props.tweet)

        const {tweet} = this.props;

        if(tweet=== null){
            return <p>This Tweet doesn't exist</p>
        }

        const {
            name,
            avatar,
            timestamp,
            text,
            hasLiked,
            likes,
            replies,
            parent
        } = tweet

        return (
            <div className="tweet">
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button
                                className='replying-to'
                                onClick={(event)=>{
                                    this.toParent(event,parent.id)
                                }}
                            >
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icons"/>
                        <span>{replies !== 0 && replies }</span>
                        <button
                            className='heart-button'
                            onClick={this.handleLike}
                        >
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className="tweet-icon"/>
                                : <TiHeartOutline className='tweet-icon'/>
                            }
                        </button>
                        <span>{likes !== 0 && likes }</span>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({authedUser, users, tweets},{id}){
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet,users[tweet.author],authedUser,parentTweet)
            : null
    }

}

export default connect(mapStateToProps)(Tweet)