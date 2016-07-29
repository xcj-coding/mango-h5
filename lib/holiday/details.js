import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip,ImageBox} from '../common/component';
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
		getDataFromAPI({
			type:'POST',
			url:'apiserver/nengli/touFang',
			data:params,
			success:(data)=>{
				this.setState({
					LOADINGTIP:false,
					jsonData:data
				},()=>{
					this.swiperFn();
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
		var swiperTest = new Swiper('.mg-hd-swiper',{
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
						<LoadingTip {...this.props} />
					) : (
						<div>
							<MgHeader data={{
								headerTitle:"跟团游",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:true,
							}} />
							<section>
							    <div className="mg-swiper mg-hd-swiper">
							        <div className="mg-swiper-bx">
							            <a className="mg-swiper-img" href="">
											<ImageBox imageUrl="" />
							            </a>
							            <a className="mg-swiper-img" href="">
											<ImageBox imageUrl="" />
							            </a>
							            <a className="mg-swiper-img" href="">
											<ImageBox imageUrl="" />
							            </a>
							        </div>
							        <div className="mg-swiper-ico"><span className="mg-swiper-active"></span><span></span><span></span></div>
							    </div>
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

							    <div className="mg-calendar">
							    	<a href="">
							    		<em className="mg-bgs mg-ico-time fl"></em>
							    		<p>出发班期与价格日历<span className="mg-ico2-sjr fr"></span></p>
							    		<p>d3131313131131...</p>
							    	</a>
							    </div>

							    <div className="mg-details">
							        <ul>
							            <li className="selected">行程详情</li>
							            <li>|</li>
							            <li>产品特色</li>
							            <li>|</li>
							            <li>预订须知</li>
							        </ul>
							        <div></div>      
							        <div></div>      
							        <div></div>      
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

export default connect(mapStateToProps,mapDispatchToProps)(DETAILS);
