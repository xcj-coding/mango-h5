import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class HOME extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props;
	}
	componentWillMount(){
		this.setState({LOADINGTIP:false});
	}
	componentDidMount(){
		getDataFromAPI({
			type:'POST',
			url:'apiserver/nengli/touFang',
			data:'{"functionid":"10000001","cityid":"0", "updatetime":"123"}',
			success:function(data){
				console.log(data);
			},
			error:function(data){
				console.log(data);
			}
		})
		
		/* 首页热卖专区 */
		let swiperlmzq = new Swiper('.mg-hot-swiper',{
			wrapperClass : 'mg-hot-list',
			slideClass : 'mg-hot-box',
			pagination : '.mg-hot-ico',
			bulletActiveClass : 'mg-hot-active',
			loop: true,
			autoplay: 30000
		})		
	}
	render(){
		return (
			<div className="mg-fadeInRight">
				{
					this.state.LOADINGTIP ? (
						<LoadingTip />
					) : (
						<div className="mg-fadeInRight">
							<MgHeader data={{
								gotoBack:true,
								headerArea:true,
								headerShare:false,
								headerCollect:false,
								headerHome:false,
							}} />
							
							<section className="mg-hot">
					        	<h2 className="mg-tit1">热卖专区</h2>
					        	<div className="mg-hot-swiper">
									<div className="mg-hot-list cf">
						                <div className="mg-hot-box">
						                	<a className="mg-hot-img" href="#/details/242500p2">
						                		<img src="./i/holiday/img1.jpg" width="100%" alt="" />
						                		<h4 className="cf"><span className="fl">出发城市  深圳、北京</span> <span className="fr">产品编号：22555</span></h4>
						                	</a>
											<h2><a href="">2晚品牌4星酒店+海洋公园门票+海洋公园餐券+电话卡+DFS礼券/4人出行换购杜莎夫人门票</a></h2>
								            <div className="mg-hot-b cf">
								            	<div className="fl">
								            		<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
								            		<p className="mg-hot-explain">芒果网倾情回馈，让您享受超低的预订价格！</p>
								            	</div>
								            	<div className="mg-hot-price fr">
								            		<strong><sub>￥</sub><em>760</em> 起</strong>
								            		<del>原价：￥1100</del>
								            	</div>
								            </div>
						                </div>
						                <div className="mg-hot-box">
						                	<a className="mg-hot-img" href="">
						                		<img src="./i/holiday/img1.jpg" width="100%" alt="" />
						                		<h4 className="cf"><span className="fl">出发城市  深圳、北京</span> <span className="fr">产品编号：22555</span></h4>
						                	</a>
											<h2><a href="">2晚品牌4星酒店+海洋公园门票+海洋公园餐券+电话卡+DFS礼券/4人出行换购杜莎夫人门票</a></h2>
								            <div className="mg-hot-b cf">
								            	<div className="fl">
								            		<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
								            		<p className="mg-hot-explain">芒果网倾情回馈，让您享受超低的预订价格！</p>
								            	</div>
								            	<div className="mg-hot-price fr">
								            		<strong><sub>￥</sub><em>760</em> 起</strong>
								            		<del>原价：￥1100</del>
								            	</div>
								            </div>
						                </div>
						            </div>
						            <div className="mg-hot-ico"></div>
					            </div>
					        </section>
							<section className="mg-productlist">
								<div className="mg-productlist-t">
									<h2 className="mg-tit1 cf">出境跟团游  <a className="mg-tit1-more fr" href="#/holiday/list">更多<em className="mg-ico2-sjr"></em></a></h2>
									<ul className="mg-productlist-list1 mg-g">
										<li className="mg-col mg-col-2">
											<a href="#/holiday/list/"><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>澳门</strong></a>
										</li>
										<li className="mg-col mg-col-2">
											<a href=""><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>日本</strong></a>
										</li>
										<li className="mg-col mg-col-2">
											<a href=""><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>法国</strong></a>
										</li>
									</ul>
								</div>
								<div className="mg-productlist-b">
									<ul className="mg-productlist-list2">
										<li>
											<a className="cf" href="">
												<img src="./i/holiday/img3.jpg" alt="" />
												<div className="mg-productlist-r1">
													<h3>新西兰 南岛4日美食精华游（每周二出发）+海洋公园餐券</h3>
													<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
													<p className="mg-productlist-explain">出发城市 :  深圳、北京<br/>出发日期：天天出发</p>
													<div className="mg-productlist-price">
														<strong><sub>￥</sub><em>760</em> 起</strong>
														<del>原价：￥1100</del>
													</div>
												</div>
											</a>
										</li>
										<li>
											<a className="cf" href="">
												<img src="./i/holiday/img3.jpg" alt="" />
												<div className="mg-productlist-r1">
													<h3>新西兰 南岛4日美食精华游（每周二出发）+海洋公园餐券</h3>
													<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
													<p className="mg-productlist-explain">出发城市 :  深圳、北京<br/>出发日期：天天出发</p>
													<div className="mg-productlist-price">
														<strong><sub>￥</sub><em>760</em> 起</strong>
														<del>原价：￥1100</del>
													</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</section>
							<section className="mg-productlist">
								<div className="mg-productlist-t">
									<h2 className="mg-tit1 cf">国内跟团游  <a className="mg-tit1-more fr" href="#/holiday/list">更多<em className="mg-ico2-sjr"></em></a></h2>
									<ul className="mg-productlist-list1 mg-g">
										<li className="mg-col mg-col-2">
											<a href=""><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>北京</strong></a>
										</li>
										<li className="mg-col mg-col-2">
											<a href=""><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>厦门</strong></a>
										</li>
										<li className="mg-col mg-col-2">
											<a href=""><img src="./i/holiday/img2.jpg" width="100%" alt="" />
											<strong>广州</strong></a>
										</li>
									</ul>
								</div>
								<div className="mg-productlist-b">
									<ul className="mg-productlist-list2">
										<li>
											<a className="cf" href="">
												<img src="./i/holiday/img3.jpg" alt="" />
												<div className="mg-productlist-r1">
													<h3>新西兰 南岛4日美食精华游（每周二出发）+海洋公园餐券</h3>
													<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
													<p className="mg-productlist-explain">出发城市 :  深圳、北京<br/>出发日期：天天出发</p>
													<div className="mg-productlist-price">
														<strong><sub>￥</sub><em>760</em> 起</strong>
														<del>原价：￥1100</del>
													</div>
												</div>
											</a>
										</li>
										<li>
											<a className="cf" href="">
												<img src="./i/holiday/img3.jpg" alt="" />
												<div className="mg-productlist-r1">
													<h3>新西兰 南岛4日美食精华游（每周二出发）+海洋公园餐券</h3>
													<p className="mg-hot-tag"><em className="mg-tag1">特价</em><em className="mg-tag2">早定</em></p>
													<p className="mg-productlist-explain">出发城市 :  深圳、北京<br/>出发日期：天天出发</p>
													<div className="mg-productlist-price">
														<strong><sub>￥</sub><em>760</em> 起</strong>
														<del>原价：￥1100</del>
													</div>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</section>



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
        LOGINSTATE:state.RDcount.get('LOGINSTATE'),
        XXX:state.Holiday.get('XXX')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(HOME);
