import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/header.less';

class Header extends Component {
	state = {
		showMain : true
	}

	changeShow = () => {
		this.setState({
			showMain : !this.state.showMain
		})
	}

    render () {
          return (
            <div className="header">
            	<Link to="/">
            		<img className="backButton" 
            			src={require('./img/back.png')} 
            			alt="back"
            			onClick = {this.changeShow}
            			style = {{display: this.state.showMain ? "none":"block"}}
            			/>
            	</Link>
            	<h3>{this.props.title}</h3>
            	<Link to="/list">
            		<img className="menuButton" 
            			src={require('./img/menu.png')} 
            			alt="list"
            			onClick = {this.changeShow}
            			style = {{display: this.state.showMain ? "block":"none"}}
            			/>
            	</Link>
            </div>
        );
    }
}

export default Header;