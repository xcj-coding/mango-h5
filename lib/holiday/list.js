import React,{Component} from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

/*常量参数配置（用于列表筛选功能）*/
// 价格区间
const PRICECONST = [
	{
		"text": "不限",
		"param": ""
	},
	{
		"text": "2000以下",
		"param": "0,2000"
	},
	{
		"text": "2001-3000",
		"param": "2001,3000"
	},
	{
		"text": "3001-5000",
		"param": "3001,5000"
	},
	{
		"text": "5001-10000",
		"param": "5001,10000"
	},
	{
		"text": "10000以上",
		"param": "10000,99999999"
	}
]
// 综合排序
const SORTCONST = [
	{
		"text": "综合排序",
		"param": "0"
	},
	{
		"text": "价格从低到高",
		"param": "1"
	},
	{
		"text": "价格从高到低",
		"param": "2"
	},
	{
		"text": "销量从高到低",
		"param": "3"
	}
]
// 出行月份筛选
const MONTHCONST = [
	{
		"text": "不限",
		"param": ""
	},
	{
		"text": "1月",
		"param": "1"
	},
	{
		"text": "2月",
		"param": "2"
	},
	{
		"text": "3月",
		"param": "3"
	},
	{
		"text": "4月",
		"param": "4"
	},
	{
		"text": "5月",
		"param": "5"
	},
	{
		"text": "6月",
		"param": "6"
	},
	{
		"text": "7月",
		"param": "7"
	},
	{
		"text": "8月",
		"param": "8"
	},
	{
		"text": "9月",
		"param": "9"
	},
	{
		"text": "10月",
		"param": "10"
	},
	{
		"text": "11月",
		"param": "11"
	},
	{
		"text": "12月",
		"param": "12"
	}
]
// 出玩天数筛选
const DAYCONST = [
	{
		"text": "不限",
		"param": ""
	},
	{
		"text": "1天",
		"param": "1"
	},
	{
		"text": "2天",
		"param": "2"
	},
	{
		"text": "3天",
		"param": "3"
	},
	{
		"text": "4天",
		"param": "4"
	},
	{
		"text": "5天",
		"param": "5"
	},
	{
		"text": "6天",
		"param": "6"
	},
	{
		"text": "7天",
		"param": "7"
	},
	{
		"text": "8天",
		"param": "8"
	},
	{
		"text": "9天",
		"param": "9"
	}
]

// 跟团游列表页
class LIST extends Component{
	constructor(props){
		super(props);
		document.title = this.props.route.name;
		this.state = {
			LOADINGTIP: true,
			AJAXFAILED: false,
			jsonData: [],
			totalPage: '',

			clientIp:'127.0.0.1',
			lineType:'',
			orgCity:'',
			dstCity:'',
			priceRange:'',
			sortType:'0',
			departureMonth:'',
			travelDays:'',
			keyword:'',
			pageSize:'',
			pageNumber:''
		};
		// 静态方法声明
		this.onscrollFn = null;
		this.timeoutFn = null;
		// 静态参数初始化
		this.pageNumber = 1;
	}
	componentWillMount(){
		// 获取首页url传值
		let keyword = this.props.location.query.keyword;
		let orgCity = MgSessionGet("LBS");
		let lineType = this.props.params.id;
		// console.log(keyword,orgCity,lineType)
		if(keyword){
			this.setState({keyword:keyword,orgCity:orgCity},function(){
				this.ajaxAPI();
			})
		}else{
			this.setState({lineType:lineType,orgCity:orgCity},function(){
				this.ajaxAPI();
			})
		}
	}
	componentDidMount(){
		// 滚动分页，有闪屏和多次加载问题（先注释，不要删）
		// this.timeoutFn = setTimeout(()=>{
		// 	this.scrollPage();
		// }, 1000);
	}
	componentWillUnmount(){
		// 卸载绑定方法
		$(document).unbind("scroll",this.onscrollFn)
	}
	// 滚动分页，有闪屏和多次加载问题（先注释，不要删）
	// scrollPage(){
	// 	let _this = this;
	// 	this.onscrollFn = () => {
	// 		let _this = this;
	// 		let top = document.documentElement.scrollTop || document.body.scrollTop;
	// 		let screenHeight = window.screen.availHeight;
	// 		console.log(ReactDOM.findDOMNode(_this.refs.morePage));
	// 		let aTop;
	// 		if(ReactDOM.findDOMNode(_this.refs.morePage)){
	// 			aTop = ReactDOM.findDOMNode(_this.refs.morePage).offsetTop
	// 		}else{
	// 			aTop = 0;
	// 		}
	// 		if(top > (aTop - screenHeight)){
	// 			this.pageNumber++;
	// 			this.setState({pageNumber:this.pageNumber},function(){
	// 				_this.ajaxAPI();
	// 			});
	// 		}
	// 	};
	// 	$(document).bind("scroll",this.onscrollFn);
	// }
	// 点击更多分页
	pageFn(event){
		// console.log(event.target.offsetTop);
		// console.log(window.screen.availHeight);
		document.body.scrollTop = event.target.offsetTop;
		let offTop = event.target.offsetTop;
		this.pageNumber++;
		this.setState({pageNumber:this.pageNumber.toString()},function(){
			this.ajaxAPI(offTop)
		});
	}
	// 选择价格区间
	handleSelectPrice(event){
		this.props.ACTIONS.xxx('Hello World~123456');
		let priceRange = event.target.name;
		if(priceRange === undefined){
			this.setState({priceRange:''});
		}else{
			this.setState({priceRange:priceRange});
			this.setState({pageNumber:"1"});
		}
	}
	// 选择综合排序
	handleSelectSort(event){
		let sortType = event.target.name;
		this.setState({sortType:sortType});
		this.setState({pageNumber:"1"});
	}
	// 选择出行月份
	handleSelectTimeMonth(event){
		let departureMonth = event.target.name;
		if(departureMonth === undefined){
			this.setState({departureMonth:''});
		}else{
			this.setState({departureMonth:departureMonth});
			this.setState({pageNumber:"1"});
		}
	}
	// 选择出玩天数
	handleSelectTimeDay(event){
		let travelDays = event.target.name;
		if(travelDays === undefined){
			this.setState({travelDays:''});
		}else{
			this.setState({travelDays:travelDays});
			this.setState({pageNumber:"1"});
		}
	}
	// 跟团游列表请求(offTop,更多按钮到顶部的距离)
	ajaxAPI(offTop){
		let params;
		let	paramsObj = {};
		paramsObj.clientIp = this.state.clientIp;//客户请求ip
		paramsObj.lineType = this.state.lineType;//产品类型：1 国内短途 2 国内长途 3港澳台 4 海外
		paramsObj.orgCity = this.state.orgCity;//出发城市
		paramsObj.dstCity = this.state.dstCity;//目的地城市
		paramsObj.priceRange = this.state.priceRange;//价格范围
		paramsObj.sortType = this.state.sortType;//排序类型：0 默认 1 按价格升序 2 按价格降序 3 按销量降序
		paramsObj.departureMonth = this.state.departureMonth;//出发月份
		paramsObj.travelDays = this.state.travelDays;//旅行天数
		paramsObj.keyword = this.state.keyword;//搜索关键字
		paramsObj.page = {};//分页page壳
		paramsObj.page.pageSize = this.state.pageSize;//分页条数
		paramsObj.page.pageNumber = this.state.pageNumber;//当前页

		params = JSON.stringify(paramsObj);

		this.setState({LOADINGTIP:true});

		getDataFromAPI({
			type:'POST',
			url:'apiserver/tourVacation/getProductList',
			data:params,
			success:(data)=>{
				if(data.code === "1"){
					// console.log(this.state.jsonData)
					// console.log(data.data.productList)
					let showProduct,
						jsonDataProductList;
					jsonDataProductList = data.data.productList
					for(let i of jsonDataProductList){
						i.productImageUrl += '-43XS';
					}
					if(this.state.pageNumber === '' || !this.state.pageNumber || this.state.pageNumber === '1'){
						showProduct = jsonDataProductList;
					}else{
						showProduct = this.state.jsonData.concat(jsonDataProductList);
					}
					// console.log(showProduct);

					if(showProduct.length < 1){
						// 列表无数据，重置筛选条件
						this.setState({
							LOADINGTIP:false,
							jsonData: showProduct,
							totalPage: '',
							priceRange:this.state.priceRange,
							sortType:this.state.sortType,
							departureMonth:this.state.departureMonth,
							travelDays:this.state.travelDays
						})
					}else{
						this.setState({
							LOADINGTIP:false,
							jsonData:showProduct,
							totalPage:data.data.totalPage,
							pageNumber:data.data.pageNumber
						},function(){
							// 定位到更多按钮处
							// this.refs.hhhh.scrollTop = offTop;
							(document.documentElement.scrollTop = offTop) && (document.body.scrollTop = offTop);
						})
					}
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
	render (){
		/**
		 * data 请求数据
		 * des 根据请求数据组合产品信息字段
		 */
		let data;
		if(this.state.jsonData){
			let jsonData = this.state.jsonData;
			data = jsonData;
		}
		return (
			<div className="mg-fadeInRight mg-pb1">
				{
					this.state.LOADINGTIP ? (
						<CM.LoadingTip />
					) : (
						<div className="mg-fadeInR3131ight">
							<CM.MgHeader data={{
								headerTitle:"产品列表",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:true,
							}} />
							{
								(!this.state.AJAXFAILED && data && (data.length < 1)) ? 
								(
									<div className="mg-list">
										<CM.NoContent title="没有数据" content="暂时没有此类数据" />
										<LISTNAV 
											priceRange={this.state.priceRange}
											sortType={this.state.sortType}
											departureMonth={this.state.departureMonth}
											travelDays={this.state.travelDays}
											pageNumber={this.state.pageNumber}
											ajaxAPI={this.ajaxAPI.bind(this)} 
											handleSelectPrice={this.handleSelectPrice.bind(this)} 
											handleSelectSort={this.handleSelectSort.bind(this)} 
											handleSelectTimeMonth={this.handleSelectTimeMonth.bind(this)} 
											handleSelectTimeDay={this.handleSelectTimeDay.bind(this)} 
										/>
									</div>
								)
								:
								(
									<div className="mg-list">
										<CM.ListItem pageFn={this.pageFn.bind(this)} areaList={data} totalPage={this.state.totalPage} pageNumber={this.state.pageNumber} />
										<LISTNAV 
											priceRange={this.state.priceRange}
											sortType={this.state.sortType}
											departureMonth={this.state.departureMonth}
											travelDays={this.state.travelDays}
											pageNumber={this.state.pageNumber}
											ajaxAPI={this.ajaxAPI.bind(this)} 
											handleSelectPrice={this.handleSelectPrice.bind(this)} 
											handleSelectSort={this.handleSelectSort.bind(this)} 
											handleSelectTimeMonth={this.handleSelectTimeMonth.bind(this)} 
											handleSelectTimeDay={this.handleSelectTimeDay.bind(this)} 
										/>
									</div>
								)
							}
						</div>
					)
				}
			</div>
		)
	}
}

// 筛选
class LISTNAV extends Component {
	constructor(props){
		super(props);
		this.state = {
			price: false,
			sort: false,
			time: false,
			priceRange: this.props.priceRange,
			sortType: this.props.sortType,
			departureMonth: this.props.departureMonth,
			travelDays: this.props.travelDays,
			pageNumber: this.props.pageNumber
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({pageNumber:"1"});
		if (nextProps.priceRange !== this.state.priceRange) {
			this.setState({priceRange:nextProps.priceRange});
		}
		if (nextProps.sortType !== this.state.sortType) {
			this.setState({sortType:nextProps.sortType});
		}
		if (nextProps.departureMonth !== this.state.departureMonth) {
			this.setState({departureMonth:nextProps.departureMonth});
		}
		if (nextProps.travelDays !== this.state.travelDays) {
			this.setState({travelDays:nextProps.travelDays});
		}
	}
	handleShow(a){
		if(a === 1){
			this.setState({price:true});
		}else if(a === 2){
			this.setState({sort:true});
		}else if(a === 3){
			this.setState({time:true});
		}
	}
	handleHide(){
		this.setState({price:false});
		this.setState({sort:false});
		this.setState({time:false});
	}
	render(){
		return (
			<div className="mg-fadeInDown">
				<div className="mg-list-nav mg-g">
					<a className="mg-col" href="javascript:;" onClick={()=>{this.handleShow(1)}}>
					    <em className="mg-bgs mg-ico-filter2"></em>
					    <p className="mg-list-nav-label">
					    	{this.state.priceRange ? this.state.priceRange : '价格区间'}
					    </p>
					</a>
					<a className="mg-col" href="javascript:;" onClick={()=>{this.handleShow(2)}}>
					    <em className="mg-bgs mg-ico-filter3"></em>
					    <p className="mg-list-nav-label">
					    	{
					    		this.props.sortType ? (
						    		SORTCONST.map((item,i)=>{
						    			if(this.props.sortType === item.param){
											return (item.text)
						    			}
						    		})
					    		) : '综合排序'
					    	}
					    </p>
					</a>
					<a className="mg-col" href="javascript:;" onClick={()=>{this.handleShow(3)}}>
					    <em className="mg-bgs mg-ico-filter4"></em>
					    <p className="mg-list-nav-label">
					    {
					    	(this.props.departureMonth || this.props.travelDays) ? (
					    		(this.props.departureMonth?this.props.departureMonth+'月':'') + ',' + (this.props.travelDays?this.props.travelDays+'天':'')
					    	) : "筛选"
					    }
					    </p>
					</a>
				</div>
				{
					this.state.price ?
					(
					<div>
						<div className="mg-list-nav-tips mg-fadeInDown">
						    <h4>价格区间 <span onClick={this.props.handleSelectPrice}>清除全部</span> </h4>
						    <div className="tips-content">
						    	<ul className="tips-price">
						    	{
						    		PRICECONST.map((item,i)=>{
						    			return <li key={i}><a className={(this.state.priceRange === item.param)?'selected':''} name={item.param} href="javascript:;" onClick={this.props.handleSelectPrice}>{item.text}</a></li>
						    		})
						    	}
						    	</ul>
						    </div>
						    <p onClick={this.props.ajaxAPI}>确定</p>
						</div>
	            		<div className="mg-mark-black mg-mask-opin" onClick={this.handleHide.bind(this)}></div>
					</div>
					) : ""
				}
				{
					this.state.sort ?
					(
					<div>
						<div className="mg-list-nav-tips mg-fadeInDown">
						    <div className="tips-content">
						    	<ul className="tips-sort">
						    	{
						    		SORTCONST.map((item,i)=>{
					    				return <li key={i}><a className={(this.state.sortType === item.param)?'selected':''} name={item.param} href="javascript:;" onClick={this.props.handleSelectSort}>{item.text}</a></li>
						    		})
						    	}
						    	</ul>
						    </div>
						    <p onClick={this.props.ajaxAPI}>确定</p>
						</div>
	            		<div className="mg-mark-black mg-mask-opin" onClick={this.handleHide.bind(this)}></div>
					</div>
					) : ""
				}
				{
					this.state.time ?
					(
					<div>
						<div className="mg-list-nav-tips mg-fadeInDown">
						    <h4>出行筛选 <span onClick={(event)=>{
						    	this.props.handleSelectTimeMonth(event);
						    	this.props.handleSelectTimeDay(event);
						    }}>清除全部</span> </h4>
						    <div className="tips-content">
						    	<p className="tips-title">出行时间</p>
						    	<ul className="tips-time">
						    	{
						    		MONTHCONST.map((item,i)=>{
					    				return <li key={i}><a className={(this.state.departureMonth === item.param)?'selected':''} name={item.param} href="javascript:;" onClick={this.props.handleSelectTimeMonth}>{item.text}</a></li>
						    		})
						    	}
						    	</ul>
						    	<p className="tips-title">游玩天数</p>
						    	<ul className="tips-time">
						    	{
						    		DAYCONST.map((item,i)=>{
					    				return <li key={i}><a className={(this.state.travelDays === item.param)?'selected':''} name={item.param} href="javascript:;" onClick={this.props.handleSelectTimeDay}>{item.text}</a></li>
						    		})
						    	}
						    	</ul>
						    </div>
						    <p onClick={this.props.ajaxAPI}>确定</p>
						</div>
	            		<div className="mg-mark-black mg-mask-opin" onClick={this.handleHide.bind(this)}></div>
					</div>
					) : ""
				}
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
	// let actions = {
	// 	sss: (data) => {
	// 		return {
	// 			type: 'XXX',
	// 			data
	// 		}
	// 	}
	// }
	let actions = MGAction;
    return {
        ACTIONS:bindActionCreators(actions,dispatch)
    };
    // return {
    //     ACTIONS:bindActionCreators(MGAction,dispatch)
    // };
};

export default connect(mapStateToProps,mapDispatchToProps)(LIST);
