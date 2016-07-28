import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip,ImageBox,NoContent,ListItem} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class HOME extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props,{
			jsonData:null
		};
	}
	componentWillMount(){
		getDataFromAPI({
			type:'POST',
			url:'apiserver/nengli/touFang',
			data:'{"functionid":"10000001","cityid":"0", "updatetime":"123"}',
			success:function(data){
				this.setState({
					jsonData:data,
					LOADINGTIP:false
				})
			}.bind(this),
			error:function(data){
				this.setState({
					LOADINGTIP:false,
					AJAXFAILED:true
				})
			}.bind(this)
		})
		
	}
	componentDidMount(){
		
	}
	render(){
		let hotData=[],listData=[];
		if(this.state.jsonData){
			hotData=this.state.jsonData.Result[0];
			listData=this.state.jsonData.Result;
			listData.shift();
		}
		console.log(this.state.jsonData,this.state.AJAXFAILED,hotData);
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
							
							{
								this.state.AJAXFAILED ?
								<NoContent title="请求失败" content="数据请求超时或者错误" />
								:
								<div>
									<HOTPRODUCTS hotData={hotData} />
									<PRODUCTSLIST listDate={listData} />
								</div> 
							}
						</div>
					)
				}
			</div>
		)
	}
}


class HOTPRODUCTS extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		/* 首页热卖专区 */
		var swiperlmzq = new Swiper('.mg-hot-swiper',{
			wrapperClass : 'mg-hot-list',
			slideClass : 'mg-hot-box',
			pagination : '.mg-hot-ico',
			bulletActiveClass : 'mg-hot-active',
			loop: true,
			autoplay: 30000
		})
	}
	render(){
		let productsLIst=this.props.hotData.areaList;
		return (
			<div>
				{	productsLIst ?
					<section className="mg-hot">
			        	<h2 className="mg-tit1">{this.props.hotData.areaName}</h2>
			        	<div className="mg-hot-swiper">
							<div className="mg-hot-list cf">
				                
				                {
				                	productsLIst.map(function(data, index) {

			                			return 	<div className="mg-hot-box" key={index}>
								                	<a className="mg-hot-img" href={"#/holiday/details/"+data.productId}>
								                		<ImageBox imageUrl={data.productImageUrl} />
								                		<h4 className="cf"><span className="fl">出发城市: {data.productStarting}</span></h4>
								                	</a>
													<h2><a href={"#/holiday/details/"+data.productId}>{data.productCaption}</a></h2>
										            <div className="mg-hot-b cf">
										            	<div className="fl">								            		
										            		<p className="mg-hot-explain">芒果网倾情回馈，让您享受超低的预订价格！</p>
										            	</div>
										            	<div className="mg-hot-price fr">
										            		<strong><sub>￥</sub><em>{data.productPrice}</em> 起</strong>
										            		<del>原价：￥{data.productOrignalPrice}</del>
										            	</div>
										            </div>
								                </div>;
				                	})
				                }	
				            </div>
				            <div className="mg-hot-ico"></div>
			            </div>
			        </section>
			        : ""
				}
			</div>
			
		)
	}
}

class PRODUCTSLIST extends Component{
	constructor(props){
		super(props)
	}
	render(){
		let productsLIst=this.props.listDate;
		return (
			<div>

				{	productsLIst ?
					productsLIst.map(function(data, index) {
                		if(data.areaType==5){ //去除热门目的地
                			return false;
                		}
						return  <section className="mg-productlist" key={index}>
									<div className="mg-productlist-t">
										<h2 className="mg-tit1 cf">{data.areaName}  <a className="mg-tit1-more fr" href={"#/holiday/list/"+data.areaType}>更多<em className="mg-ico2-sjr"></em></a></h2>
										{ data.cityList ? 
											<ul className="mg-productlist-list1 mg-g">
												{
													data.cityList.map(function(dataChild, indexChild) {
														return 	<li className="mg-col mg-col-2" key={indexChild}>
																	<a href={"#/holiday/list/"+data.areaType+"/"+dataChild.cityId}>
																		<ImageBox imageUrl={dataChild.cityPicture} />
																		<strong>{dataChild.cityCaption}</strong>
																	</a>
																</li>;
													})
												}

											</ul> : ""
										}
									</div>
									{ data.areaList ?
										<div className="mg-productlist-b">
											<ListItem areaList={data.areaList} />
										</div> : ""
									}
								</section>;
					})	
					:""
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

