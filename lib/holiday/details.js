import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class DETAILS extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = {
			LOADINGTIP: true,
			AJAXFAILED: false,
			jsonData: ''
		}
	}
	componentWillMount(){
		this.ajaxAPI();
	}
	componentDidMount(){
		
	}
	ajaxAPI (){
		let productId = this.props.params.id,
			params;
		params = '{"functionid":"10000001","productId":"' + productId + '"}'
		// params = '{"clientIp":"10.10.222.188"}'
		getDataFromAPI({
			type:'POST',
			url:'apiserver/nengli/touFang',
			// url:'apiserver/tourVacation/getProductList',
			data:params,
			success:(data)=>{
				this.setState({
					LOADINGTIP:false,
					jsonData:data
				})
			},
			error:(data)=>{
				this.setState({
					LOADINGTIP:false,
					AJAXFAILED:true
				})
			}
		});
	}
	swiperFn (){
		$(".mg-swiper-img").show();
		let swiperTest = new Swiper('.mg-hd-swiper',{
			wrapperClass : 'mg-swiper-bx',
			slideClass : 'mg-swiper-img',
			pagination : '.mg-swiper-ico',
			bulletActiveClass : 'mg-swiper-active',
			loop: true,
			autoplay: 3000
		});
	}
	render(){
		return (
			<div className="mg-fadeInRight">
				{
					this.state.LOADINGTIP ? (
						<CM.LoadingTip />
					) : (
						<div className="mg-fadeInRight">
							<CM.MgHeader data={{
								headerTitle:"跟团游",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:true,
							}} />
							{
								this.state.AJAXFAILED ? 
								<CM.NoContent title="请求失败" content="数据请求超时或者错误" />
								:
								<div>
								    <PRODUCTIMG swiperFn={this.swiperFn} />
								    <PRODUCTDES />
								    <PRODUCTDATE productId={this.props.params.id} />
								    <CM.Tab>
										<div name="产品详情1">
										   产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1产品详情1
										</div>
										<div name="产品详情2">
										   产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2产品详情2
										</div>
										<div name="产品详情3">
										   产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3
										</div>
										<div name="产品详情3">
										   产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3产品详情3
										</div>
								    </CM.Tab>
								</div>
							}
						</div>
					)
				}
			</div>
		)
	}
}

class PRODUCTIMG extends Component {
	componentDidMount(){
		this.props.swiperFn();
	}
	render(){
		return (
		    <div className="mg-swiper mg-hd-swiper">
		        <div className="mg-swiper-bx">
		            <a className="mg-swiper-img" href="">
						<CM.ImageBox imageUrl="" />
		            </a>
		            <a className="mg-swiper-img" href="">
						<CM.ImageBox imageUrl="" />
		            </a>
		            <a className="mg-swiper-img" href="">
						<CM.ImageBox imageUrl="" />
		            </a>
		        </div>
		        <div className="mg-swiper-ico"><span className="mg-swiper-active"></span><span></span><span></span></div>
		    </div>
		)
	}
}
class PRODUCTDES extends Component {
	render(){
		return(
			<div className="mg-hd-pname">
			    <h3>大大大佛佛潜伏期大大大佛佛潜伏期大伏期哦急大大大佛佛潜哦急</h3>
			    <div className="cf">
			        <div className="mg-hd-pname-l"><sub>￥</sub><em>13131</em><sub>起/人</sub></div>
			        <div className="mg-hd-pname-r">
			            <p>潜伏期大</p>
			            <p>潜伏期大</p>
			        </div>
			    </div>
			</div>
		)
	}
}
class PRODUCTDATE extends Component {
	render(){
		return(
			<div className="mg-calendar">
				<Link to={'holiday/date?productId=' + this.props.productId}>
					<em className="mg-bgs mg-ico-time fl"></em>
					<p>出发班期与价格日历<span className="mg-ico2-sjr fr"></span></p>
					<p>d3131313131131...</p>
				</Link>
			</div>
		)
	}
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE'),
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(DETAILS);
