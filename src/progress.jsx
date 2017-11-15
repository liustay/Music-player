import React, { Component } from 'react';
import './css/progress.less'

class Progress extends Component {
	changeProgress = (e) => {
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		console.log(progress);
		this.props.changePercent && this.props.changePercent(progress);
	}

    render () {
          return (
            <div className="progress" ref="progressBar" onClick={this.changeProgress}>
            	<div className="percent" style={{width: `${this.props.progress}%`}}>
                    <div className="dot"></div>
            	</div>
            </div>
        );
    }
}

export default Progress;