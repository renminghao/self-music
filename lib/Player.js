import React,{Component} from 'react'
import Video from './Video'

class Player extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.style = this.style.bind(this)
	}

	style() {
		let { info } = this.props
		return {
			playerBg : {
				backgroundImage : `url(${info.picture})`
			}
		}
	}

	render() {
		let { info } = this.props;
		let { style } = this
		return (
			<div className="containerPlayer">
				<div className="player" style={style().playerBg}></div>
				<Video url={info.url} picture={info.picture}/>
			</div>)
	}
}

export default Player