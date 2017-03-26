import React,{Component} from 'react'
let searchFuc;
class Video extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	play : true
	  };
	  "pause_next_like_play_search".split('_').map(item=>this[item]=this[item].bind(this))
	}

	pause() {
		let { play } = this.state;
		this.setState({
			play : !play
		},()=>{
			this.refs.video.pause()
		})
	}

	play() {
		let { play } = this.state;
		this.setState({
			play : !play
		},()=>{
			this.refs.video.play()
		})		
	}

	next(){
		this.props.next();
	}

	like(){

	}

	search() {
		searchFuc && clearTimeout(searchFuc)

		searchFuc = setTimeout(()=>{
			this.getSearchDate()
		},300)
	}

	getSearchDate(){

		let { searchContent } = this.state;
		fetch(`https://douban.fm/j/v2/query/song?q=${searchContent}`)
		.then(json=>json.json())
		.then(data=>{
			this.setState({
				searchResult : data.items.filter(function(item) {
					return item.url
				})
			})
		})
		.catch(e=>{
			console.error(e)
		})
	}

	selectMusic (info) {
		this.setState({
			searchResult : []
		},()=>{
			this.props.playByContent(info)	
		})
	}

	render() {
		let { url,picture,title,summary } = this.props
		let { play,searchResult,searchContent } = this.state;
		return (
			<div className="video">
				<div className="contral">
					<div className="word">
						<div className="search">
							<input 
								placeholder="搜搜搜"
								onChange={val=>this.setState({searchContent : val.target.value},()=>{this.search()})}
							/>
							<ul>
								{searchResult ?  
									searchResult.map((item,key)=>{
										return <li key={key} onClick={this.selectMusic.bind(this,item)}>
															{item.title}-{item.artist_name}
														</li>
									})
								: ''}
							</ul>
						</div>
					</div>
					<div className="interface">
						<div className="bg" style={{backgroundImage : `url(${picture})`}}></div>
						<div className="title"><span>{summary || title}</span></div>
					</div>
				</div>
				<div className="operation">
					{play ? <i
										onClick={this.pause}
									>&#xe60f;</i> :
									<i 
										onClick={this.play}
									>&#xe646;</i>
					}
					<i
						onClick={this.next}
					>&#xe647;</i>
					<i
						onClick={this.like}
					>&#xe601;</i>
				</div>
				<video 
					ref="video" 
					src={url} 
					controls={true} 
					className="reactVideo" 
					autoPlay={true}
				></video>
			</div>)
	}
}

export default Video