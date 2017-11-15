import React, { Component } from 'react';
import ListItem from './listItem'

class List extends Component {
     
    render () {
        let Items = this.props.musicList.map((item) => {
            return (
                <ListItem key={item.id} data={item} focus={item === this.props.currentMusicItem}/>
            );
        });
        return (
            <ul>
                { Items }
            </ul>
        );
    }
}

export default List;