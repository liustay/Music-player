import React, { Component } from 'react';
import $ from 'jquery'
import jPlayer from 'jPlayer'
import { MUSIC_LIST } from './config/musiclist'
import Header from './header.jsx'
import Player from './player.jsx'
import List from './list.jsx'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Pubsub from 'pubsub-js'


let duration = null


class App extends Component {

    state = {
        musicList: MUSIC_LIST,
        currentMusicItem: MUSIC_LIST[0],
    }

    playMusic = (item) => {
        $("#player").jPlayer("setMedia", {mp3: item.file}).jPlayer("play")
        this.setState({
            currentMusicItem: item,
        })
    }

    findMusicIndex = (e) => {
        return this.state.musicList.indexOf(e)
    }

    playNext = (type = 'next') => {
        let index = this.findMusicIndex (this.state.currentMusicItem)
        let newIndex = null 
        let length = this.state.musicList.length

        if (type === 'next') {
            newIndex = (index + 1) % length
        } else {
            newIndex = (index - 1 + length) % length
        }

        this.playMusic (this.state.musicList[newIndex])
    }

    componentDidMount () {
       $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window"
       });

       this.playMusic (this.state.currentMusicItem);

        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playNext()
        });

       Pubsub.subscribe("PLAY_MUSIC", (msg, item) => {
            this.playMusic (item)
       });

       Pubsub.subscribe("DEL_MUSIC", (msg, item) => {
            if(this.state.currentMusicItem === item){
                this.playNext();
            }
            this.setState({
                musicList: this.state.musicList.filter(e => {
                    return e !== item
                })
            })
       });


       Pubsub.subscribe("PLAY_PREV", (msg, item) => {
            this.playNext ('prev')
       });


       Pubsub.subscribe("PLAY_NEXT", (msg, item) => {
            this.playNext ()
       });

    }
    
    componentWillUnmount() {

        Pubsub.unsubscribe("PLAY_MUSIC");

        Pubsub.unsubscribe("DEL_MUSIC");

        Pubsub.unsubscribe("PLAY_PREV");

        Pubsub.unsubscribe("PLAY_NEXT");

        $('#player').unbind($.jPlayer.event.ended);
    }
    
    render () {
        const PlayPanel = () => (
            <Player
                 currentMusicItem={this.state.currentMusicItem}
                 mode={this.state.mode}
                 playing={this.state.playing}
              />
        )
        const ListPanel = () => (
            <List
                 currentMusicItem={this.state.currentMusicItem}
                 musicList={this.state.musicList}
               />
            )
          return (
            <Router>
                <div>
                    <Header title="My Player"/>
                    <Route exact path="/" component={PlayPanel} />
                    <Route path="/list" component={ListPanel} /> 
                </div>    
            </Router>
        );
    }
}

export default App;