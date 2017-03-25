import React,{Component} from 'react'

class Video extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}

	render() {
		let { url,picture } = this.props
		return (
			<div className="video">
				<div className="bg" style={{backgroundImage : `url(${picture})`}}></div>
				<video src={url} controls={true} className="reactVideo" autoPlay={true}></video>
			</div>)
	}
}

export default Video