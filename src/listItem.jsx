import React, { Component } from 'react';
import './css/listItem.less'
import Pubsub from 'pubsub-js'

class ListItem extends Component {
    playMusic = (item) => {
        Pubsub.publish("PLAY_MUSIC",item)
    };

    delMusic = (item, e) => {
        e.stopPropagation()
        Pubsub.publish("DEL_MUSIC",item)
    };
     
    render () {
        const item =this.props.data
        return (
            <li className={`item ${this.props.focus ? 'focus':''}`} onClick={this.playMusic.bind(this, item)}>
                <span><strong>{item.title}</strong> - {item.artist}</span>
                <span className="del" onClick={this.delMusic.bind(this, item)}></span>
            </li>
        )
    }
}

export default ListItem;