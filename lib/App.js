import React,{Component} from 'react'
import Loading from 'react-loading'
import Player from './Player'

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	loading : true
	  };

	  this.getRemoteData = this.getRemoteData.bind(this)
	  this.playByContent = this.playByContent.bind(this)
	}

	componentDidMount() {
		this.getRemoteData()
	}

	getRemoteData() {

		fetch('https://douban.fm/j/v2/playlist?channel=0&kbps=192&app_name=radio_website&version=100&type=s&sid=1385640')
		.then(json=>json.json())
		.then(data=>{
			this.setState({
				info : data.song[0],
				loading : false
			})
		})
		.catch(e=>{
			console.error(e)
		})
	}

	playByContent(content) {
		this.setState({
			info : content
		})
	}

	render() {
		const { loading,info } = this.state
		return (
			<div className={`container ${loading ? '' : 'fullPage'}`}>
					{loading ? <Loading type='cubes' color='#dd2727' /> : <Player info={info} next={this.getRemoteData} playByContent={this.playByContent}/>}
			</div>
			)
	}
}

export default App