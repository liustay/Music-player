import React, { Component } from 'react';
import $ from 'jquery'
import jPlayer from 'jPlayer'
import Progress from './progress.jsx'
import './css/player.less'
import Pubsub from 'pubsub-js'

let duration = null

class Player extends Component {
    state = {
        progress: 0,
        isPlay: true,
        transform: 'rotate(0deg)',
        allTime: '-:-',
        leftTime: '-:-'
    }

    componentDidMount () {
       
       $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState ({
                progress: e.jPlayer.status.currentPercentAbsolute,
                allTime: this.timeFormat(duration),
                leftTime: this.timeFormat(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            })
       })

       this.setState({
            isPlay: this.state.isPlay,
            allTime: this.state.allTime,
            leftTime: this.state.leftTime
       })
       
    }
    componentWillUnmount () {
        $("#player").unbind($.jPlayer.event.timeupdate)
    }

    

    timeFormat = (time) => {
        let miniutes = String(Math.floor(time / 60)).padStart(2,'0')
        let seconds = String(Math.floor(time % 60)).padStart(2,'0')
        return miniutes+":"+seconds
    }

    changePercent = ( progress ) => {
        $('#player').jPlayer(this.state.isPlay ? 'play':'pause',duration * progress);
    }

    play = () => {
        if (this.state.isPlay) {
            $("#player").jPlayer('pause')
        } else {
            $("#player").jPlayer('play')
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    playPrev = () => {
        Pubsub.publish("PLAY_PREV")
    }

    playNext = () => {
        Pubsub.publish("PLAY_NEXT")
    }
	
    render () {
        const { progress } = this.state
          return (
            <div>
                <div className="wrap">
                    <div className="cover">
                        <img className='cover-img' src={this.props.currentMusicItem.cover}/>
                        <p className='title'>{this.props.currentMusicItem.title}</p>
                        <p className='artist'>{this.props.currentMusicItem.artist}</p>
                    </div>
                    <Progress progress = { progress } changePercent = {this.changePercent}/>
                    <div className="time">
                        <span className="current">{this.state.leftTime}</span>
                        <span className="total">{this.state.allTime}</span>
                    </div>
                    <div className="control">
                        <i className="prev" onClick = {this.playPrev}></i>
                        <i className={this.state.isPlay? "pause":"play"} onClick={this.play}></i>
                        <i className="next" onClick = {this.playNext}></i>
                    </div>
                </div>
                <img className='cover-bg' src={this.props.currentMusicItem.cover}/>
            </div>
        );
    }
}

export default Player;