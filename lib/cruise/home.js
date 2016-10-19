import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';
import {VelocityComponent,VelocityTransitionGroup} from 'velocity-react';

class HOME extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = Object.assign({},this.props,{hovering:false})
	}
	componentWillMount(){
		document.getElementById("app").onclick = function(){
			getDataFromAPI({
				url: 'www.baidu.com',
				type: 'post',
				data: '{"a":"123","b":"456"}',
				// success: function(data){
				// 	console.log(data);
				// },
				// error: function(data){
				// 	console.log(data);
				// }
			});
		}
		
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
		$(".mg-banner-img").show();
		let swiperBanner = new Swiper('.mg-banner',{
			wrapperClass : 'mg-banner-bx',
			slideClass : 'mg-banner-img',
			pagination : '.mg-swiper-ico',
			bulletActiveClass : 'mg-swiper-active',
			loop: true,
			autoplay: 3000
		})

		$(".mg-tjcp-img").show();
		let swiperTjcp = new Swiper('.mg-tjcp-warp',{
			wrapperClass : 'mg-tjcp-bx',
			slideClass : 'mg-tjcp-img',
			pagination : '.mg-swiper-ico',
			bulletActiveClass : 'mg-swiper-active',
			loop: true,
			autoplay: 8000
		})
	}
	render(){
		let transition = 'sfr';
		var animationProps;
		if(this.state.hovering) {
			animationProps = {
				duration: 200,
				animation: {
					rotateX: 160
				}
			};
		}else{
			animationProps = {
				duration: 1100,
				animation: {
					rotateX: [0, 'spring']
				}
			};
		}
		return (
			<div onClick={()=>{this.state.hovering ? this.setState({hovering:false}) : this.setState({hovering:true});}} >
				<VelocityComponent {...animationProps}>
					<MgHeader data={{
						headerTitle:"跟团游",
						gotoBack:true,
						headerArea:false,
						headerShare:false,
						headerCollect:false,
						headerHome:false,
					}} />
				</VelocityComponent>
				{
					this.state.LOADINGTIP ? (
						<div><LoadingTip /></div>
					) : (
						<div>
							<section className="mg-banner">
							    <div className="mg-banner-bx">
							        <a className="mg-banner-img" href=""><img src="./i/cruise/main-banner.jpg" width="100%" alt="" /></a>
							        <a className="mg-banner-img" href=""><img src="./i/cruise/main-banner.jpg" width="100%" alt="" /></a>
							        <a className="mg-banner-img" href=""><img src="./i/cruise/main-banner.jpg" width="100%" alt="" /></a>
							    </div>
							    <div className="mg-swiper-ico"><span className="mg-swiper-active"></span><span></span><span></span></div>
							</section>

							<nav className="mg-areanav mg-pos-r g">
							    <div className="col mg-areanav-active">
							        <a href="#" title="">
							            <span><img src="./i/cruise/area1.jpg" width="100%" alt="" /></span>
							            <h3 className="mg-fs28">日韩</h3>
							        </a>
							    </div>
							    <div className="col">
							        <a href="#" title="">
							            <span><img src="./i/cruise/area2.jpg" width="100%" alt="" /></span>
							            <h3 className="mg-fs28">东南亚</h3>
							        </a>
							    </div>
							    <div className="col">
							        <a href="#" title="">
							            <span><img src="./i/cruise/area3.jpg" width="100%" alt="" /></span>
							            <h3 className="mg-fs28">地中海</h3>
							        </a>
							    </div>
							    <div className="col">
							        <a href="#" title="">
							            <span><img src="./i/cruise/area4.jpg" width="100%" alt="" /></span>
							            <h3 className="mg-fs28">阿拉斯加</h3>
							        </a>
							    </div>
							    <em className="mg-areanav-line mg-pos-a"></em>
							</nav>

							<section className="mg-tjcp mg-mt35">
							    <div className="mg-tjcp-warp">
							        <div className="mg-tjcp-bx">
							            <a className="mg-tjcp-img" href="">
							                <em className="mg-fs22">限时低价抢购</em>
							                <h4 className="mg-fs22 cf"><span className="fl">跟团游丨深圳出发</span><span className="fr">产品编号 2365889</span></h4>
							                <img src="./i/cruise/product1.jpg" width="100%" alt="" />
							            </a>
							            <a className="mg-tjcp-img" href="">
							                <em className="mg-fs22">限时低价抢购</em>
							                <h4 className="mg-fs22 cf"><span className="fl">跟团游丨深圳出发</span><span className="fr">产品编号 2365889</span></h4>
							                <img src="./i/cruise/product1.jpg" width="100%" alt="" />
							            </a>
							            <a className="mg-tjcp-img" href="">
							                <em className="mg-fs22">限时低价抢购</em>
							                <h4 className="mg-fs22 cf"><span className="fl">跟团游丨深圳出发</span><span className="fr">产品编号 2365889</span></h4>
							                <img src="./i/cruise/product1.jpg" width="100%" alt="" />
							            </a>
							        </div>
							        <div className="mg-swiper-ico"><span className="mg-swiper-active"></span><span></span><span></span></div>
							    </div>
							    <div className="mg-tjcp-title g">
							        <h2 className="mg-fs26 col col-4">[钻石国际邮轮] 上海-下关-济州-上海5天海上度假 <sapn className="mg-color-999">[芒果网盛大包船]</sapn> </h2>
							        <p className="mg-fs32 col col-2"><sup className="mg-fs22">￥</sup>3200起/人</p>
							    </div>
							</section>

							<section className="mg-cplist mg-mt35">
							    <div className="mg-cplist-bx">
							        <a className="cf" href="">
							            <span className="mg-cplist-img fl"><img src="./i/cruise/product-list1.jpg" width="100%" alt="" /></span>
							            <div className="mg-cplist-r">
							                <h3 className="mg-fs24 mg-color-6a6a6a">日本长崎+九重+熊本+福冈5日日本长崎+九重+熊本+福冈5日[跟团游]</h3>
							                <p className="mg-color-999 mg-fs20">香港出发</p>
							                <p className="mg-color-999 mg-fs20 cf">
							                    <span className="fl">出发日期：2016-05-21</span>
							                    <span className="fr"><del>原价300</del>
							                    <span className="mg-color-yellow mg-ml10 mg-fs28"><span className="mg-fs20">¥</span><strong>190</strong>起</span></span>
							                </p>
							            </div>
							        </a>
							    </div>
							</section>
							<div className="mg-page1 mg-fs24">
							    <a href="javascript:;">更多热门推荐<em className="mg-bgs mg-inc-ico1"></em></a>
							</div>

							<Link to = "holiday">跟团游</Link>
							<Link to = "page1"> 页面 1 </Link>
							<Link to = "page2"> 页面 2 </Link>
						</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(HOME);
