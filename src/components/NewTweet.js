import React, {Component} from 'react';
import {connect} from 'react-redux'
import {handleAddTweet} from "../actions/tweets";
import {Redirect} from 'react-router-dom'

class NewTweet extends Component {

    constructor(props) {
        super(props);
        this.state={
            text:"",
            toHome:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const text =event.target.value;
        this.setState(()=>{
            return {
                text
            }
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const {text} = this.state
        const {dispatch,id} = this.props
        dispatch(handleAddTweet(text,id))
        this.setState(()=>{
            return {
                text:'',
                toHome:id ? false : true
            }
        })

    }

    render(){

        const {text,toHome} = this.state

        if(toHome){
            return <Redirect to='/'/>
        }

        const tweetLeft = 280 - text.length

        {/* todo: redirect to the homeview when submitted*/}

        return(
            <div>
                <h3 className="center">Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder = "What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />
                    {tweetLeft <= 100 &&(
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={text===''}
                    >
                        Submit
                    </button>

                </form>

            </div>
        )
    }
}

export default connect()(NewTweet)