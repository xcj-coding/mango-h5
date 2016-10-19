import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,swiperImgShow,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

// 跟团游详情页
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
		// 请求api接口
		this.ajaxAPI();
	}
	componentDidMount(){
		
	}
	ajaxAPI (){
		let productId = this.props.params.id,
			params;
		params = '{"productId":"' + productId + '"}'
		getDataFromAPI({
			type:'POST',
			url:'apiserver/tourVacation/getProductDetailByID',
			// url:'apiserver/visa/getVisaIndex',
			// url:'apiserver/tourVacation/singleProductDetail',
			data:params,
			success:(data)=>{
				if(data.code === "1"){
					this.setState({
						LOADINGTIP:false,
						jsonData:data.data
					})
				}else{
					this.setState({
						LOADINGTIP:false,
					})
					Tips({message:data.message});
				}
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
			autoplay: 3000,
			onInit: function(swiper){
				//焦点轮播图首尾图不显示问题
				swiperImgShow($(".mg-hd-swiper"));
			}
		});
	}
	render(){
		/**
		 * data 请求数据
		 * des 根据请求数据组合产品信息字段
		 */
		let data,des;
		if(this.state.jsonData){
			data = this.state.jsonData;
			des = {
				name: data.name,//产品标题
				arrivalCN: data.arrivalCN,//产品目的地
				departureCN: data.departureCN,//产品出发城市
				itineraryDay: data.itineraryDay,//产品行程天数
				productPrice: data.productPrice//产品价格
			};
		}
		
		return (
			<div className="mg-fadeInRight mg-pb1">
				{
					this.state.LOADINGTIP ? (
						<CM.LoadingTip />
					) : (
						<div className="mg-fadeInRight">
							<CM.MgHeader data={{
								headerTitle:"产品详情",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:true,
							}} />
							{
								((!this.state.AJAXFAILED && data) ? 
									<div>
									    <PRODUCTIMG swiperFn={this.swiperFn} productImgData={data.pictures} />
									    <PRODUCTDES productDes={des} />
									    <PRODUCTDATE productId={this.props.params.id} startDatePriceString={data.startDatePriceString} />
									    <CM.Tab>
									    {
									    	data.recomdJourneyList.map((item,i)=>{
												return (
													<div key={i} name={item.name}>
														{item.description}
													</div>
												);
									    	})
									    }
									    </CM.Tab>
									    <CM.NavBottom Reserve="true" productId={this.props.params.id}  />
									</div>
								:
									<CM.NoContent title="请求失败" content="数据请求超时或者错误" />
								)
							}
						</div>
					)
				}
			</div>
		)
	}
}

// 跟团游详情页滚播图
class PRODUCTIMG extends Component {
	componentDidMount(){
		this.props.swiperFn();
	}
	render(){
		let pictures = this.props.productImgData
		return (
		    <div className="mg-swiper mg-hd-swiper">
		        <div className="mg-swiper-bx">
        	    	{
        	    		pictures.map((item,i)=>{
        	    			return (
        			            <a className="mg-swiper-img" key={i} href="javascript:;">
        							<CM.ImageBox imageUrl={item.filepath} />
        			            </a>
        	    			);
        	    		})
        	    	}
		        </div>
		        <div className="mg-swiper-ico">
        	    	{
        	    		pictures.map((item,i)=>{
        	    			return (
        			            <span key={i} className={(i===0) ? "mg-swiper-active" : ''}></span>
        	    			);
        	    		})
        	    	}
		        </div>
		    </div>
		)
	}
}
// 跟团游详情页产品信息
class PRODUCTDES extends Component {
	render(){
		let des = this.props.productDes;
		return(
			<div className="mg-hd-pname">
			    <h3>{des.name}</h3>
			    <div className="cf">
			        <div className="mg-hd-pname-l"><sub>￥</sub><em>{des.productPrice}</em><sub>起/人</sub></div>
			        <div className="mg-hd-pname-r">
			            <p>出发城市：{des.departureCN}</p>
			            <p>行程天数：{des.itineraryDay}天&nbsp;&nbsp;&nbsp;&nbsp;目的地：{des.arrivalCN}</p>
			        </div>
			    </div>
			</div>
		)
	}
}
// 跟团游详情页出发班期与价格日历
class PRODUCTDATE extends Component {
	render(){
		return(
			<div className="mg-calendar">
				<Link to={'holiday/date/' + this.props.productId}>
					<em className="mg-bgs mg-ico-time fl"></em>
					<p>出发班期与价格日历<span className="mg-ico2-sjr fr"></span></p>
					<p className="calendar-text">{this.props.startDatePriceString}</p>
				</Link>
			</div>
		)
	}
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE'),
        XXX:state.Holiday.get('XXX'),
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(DETAILS);
