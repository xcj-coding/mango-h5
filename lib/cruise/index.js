console.log("进入游轮－－举个栗子");
import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {MgHeader,NavBottom,LoadingTip} from '../common/component';
import * as AMUI from 'amazeui-touch';

import * as MGAction  from '../actions/index';
import { history } from 'react-router';


const albums = [
	{
		title: 'aaa',
		desc: `111111111`
	},{
		title: '第一张精选',
		desc: `222222222`
	},{
		title: 'Silence',
		desc: `333333333`
	}
];

class CRUISE extends Component{
	constructor(props){
		super(props)
		document.title = props.route.name
		this.state = {
		    getData:{},
		    LOADINGTIP:false
		};
	}
	componentWillMount(){
		let {ACTIONS} = this.props;
		console.log(ACTIONS);
		console.log(this.state);
		console.log(this.props);
		this.setState({LOADINGTIP:false},function(){
			console.log(this.props);
			console.log(this.state);
		});
	}
	componentDidMount(){
		let swiperBanner = new Swiper('.mg-banner',{
			wrapperClass : 'mg-banner-bx',
			slideClass : 'mg-banner-img',
			pagination : '.mg-swiper-ico',
			bulletActiveClass : 'mg-swiper-active',
			loop: true,
			autoplay: 3000
		})
	}
	// <MgHeader headerTitle="游轮" gotoBack={true} lastUrl={'http://m.mangocity.com/'} />
	render(){
		let transition = 'sfr';
		return (
			<div>
				<MgHeader headerTitle="游轮" gotoBack={true} />
				{
					this.state.LOADINGTIP ? (
						<div><LoadingTip /></div>
					) : (
						<AMUI.Container className="container-scrollable" transition={transition} component="div" scrollable {...this.props}>
							<section className="mg-banner">
							    <div className="mg-banner-bx">
							        <a className="mg-banner-img" href=""><img src="/i/tanker/main-banner.jpg" width="100%" alt="" /></a>
							        <a className="mg-banner-img" href=""><img src="/i/tanker/main-banner.jpg" width="100%" alt="" /></a>
							        <a className="mg-banner-img" href=""><img src="/i/tanker/main-banner.jpg" width="100%" alt="" /></a>
							    </div>
							    <div className="mg-swiper-ico"><span className="mg-swiper-active"></span><span></span><span></span></div>
							</section>
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
							<NavBottom />

						</AMUI.Container>
					)
				}
			</div>
		)
	}
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CRUISE);
