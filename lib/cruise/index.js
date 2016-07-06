console.log("进入游轮－－举个栗子");
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {Link} from 'react-router';

import {NavBottom} from '../common/common';
import * as AMUI from 'amazeui-touch';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const albums = [
	{
	title: '女爵',
	desc: `
		她坦白了我们所虚伪的 她单纯了我们所复杂的
		五年以来…
		5年的等待，是个漫长也是耗损的过程。
		看尽乐坛芭比娃娃的甜美面具，「性格」这两个字，似乎快要消失！
		她的声音，她的个性，象徵著无可取代的高傲、独特的姿态，
		这样一股充满灵魂的音乐、沉寂而刚苏醒的真声音，
		是我们唯一相信且期待杨乃文的理由。`
	},
	{
	title: '第一张精选',
	desc: `
	    出道六年来只出过三张专辑的杨乃文，第一次集合三张专辑的精华构成了这张充满个性的精选辑。专辑收录尚未发片前首先曝光，原始浓烈的杨乃文独唱曲[爱上你只是我的错]、曾让无数人伤感落泪的《我给的爱》、悲情经典《silence》、杨乃文96年在魔岩校园live演唱会上敏感热烈的创作《fear》、充满古典优雅气质的电影[第凡内早餐]的主题曲《monn river》等好歌。通过尝试各种新鲜形象，搭配MV营造的氛围，总是给人耳目一新的新感觉。`
	},
	{
	title: 'Silence',
	desc: `所有人都能从作品中听到能量和震撼的呈现，矛盾与妥协，失意与快乐，制作人林炜哲是真正进入到歌手的灵魂，找出最真实的瞬间再燃烧释放，献给大家；这种完全认真作音乐不哈啦的态度，不是只字片语能形容，也并非速食文化所能比拟，这种精神是和全世界的音乐人同步，这也是他们的作品和台湾大部份截然不同的原因。这样的音乐正是台湾年轻人目前需要的，与世界处在同步潮流，所有年轻人都能感受的热情和力量`
	}
];

class CRUISE extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		let transition = 'sfr';
		return (
			<div>
				  <AMUI.Modal role="loading"
          isOpen={true}
          // onDismiss=''
          // onOpen=''
          // onClosed='' 
          />
					<AMUI.Container className="container-scrollable" transition={transition} component="div" scrollable {...this.props}>
						<h1>游轮</h1>
				<ReactCSSTransitionGroup component="div" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

						<AMUI.Button>test</AMUI.Button>
						<Link to = "page1"> 页面 1 </Link>
						<Link to = "page2"> 页面 2 </Link>
		        </ReactCSSTransitionGroup>

						<AMUI.Accordion defaultActiveKey={1}>
							{albums.map((ablum, i) => {
								return (
									<AMUI.Accordion.Item title={ablum.title} key={i}>
									<p>{ablum.desc}</p>
									</AMUI.Accordion.Item>
								)
							})}
						</AMUI.Accordion>

					</AMUI.Container>
				
				<NavBottom />
			</div>
		)
	}
}

export default CRUISE;