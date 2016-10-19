import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

import {createHistory} from 'history';

// 跟团游团期页 jsonData价格查询结果
class DATE extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state =this.props,{
			LOADINGTIP: true,
			AJAXFAILED: false,
			jsonData: ''
		};
	}
	componentWillMount(){
		// 请求api接口
		this.ajaxAPI();
	}
	ajaxAPI(){
		let productId = this.props.params.id,
			params;
			//productId = "10514137";
		params = '{"productId":"' + productId + '"}'
		getDataFromAPI({
			type:'POST',
			url:'apiserver/tourVacation/getCalendarPriceData',
			data:params,
			success:(data)=>{
				
				if(data.code === "1"){
					this.setState({
						LOADINGTIP:false,
						jsonData:data.data
					})
				}else{
					Tips({message:data.message}); 
					this.setState({
						LOADINGTIP:false,
						AJAXFAILED:true
					})
					
				}
			},
			error:(data)=>{
				Tips({message:data.message});
				this.setState({
					LOADINGTIP:false,
					AJAXFAILED:true
				})
				 
			}
		});
	}
	render(){
		/**
		 * data 请求数据
		 * des 根据请求数据组合产品信息字段
		 * DateHeader 第一部分产品信息组件
		 * PeopleSelect 选择团期日期和人数组件
		 */
		let data,des,productId;
		productId=this.props.params.id;
		//productId = "10514137";
		if(this.state.jsonData){
			data = this.state.jsonData;
		}
		return (
			<div className="mg-fadeInRight">
				{
					this.state.LOADINGTIP ? (
						<CM.LoadingTip />
					) : (
						<div>
							<CM.MgHeader data={{
								headerTitle:"选择日期和人数",
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
                                    <DateHeader productName={data.productName}  lowestPrice={data.lowestPrice} />
									<PeopleSelect productId={productId} minPersons={data.minPersons} maxPersons={data.maxPersons} adultJoin={data.adultJoin} childJoin={data.childJoin} priceData={data.priceData} />
                                </div> 
                            }
						</div>
					)
				}
			</div>
		)
	}
}

//产品信息组件
class DateHeader extends Component{
	constructor(props){
		super(props);
		this.state =this.props;
	}
	render(){
		return  <header className="mg-pageheader">
					<h2>{this.state.productName}</h2>
					<div className="mg-pageheader-price"><sub>￥</sub><em>{this.state.lowestPrice}</em> 起</div>
				</header>
	}
}

/*选择团期日期和人数组件
 * productId 产品ID
 * minPersons 成人最小人数
 * maxPersons 成人最大人数
 * adultJoin 成人能否参加 能参加为1
 * childJoin 儿童能否参加 能参加为1
 * priceData 日历价格集合
**/
class PeopleSelect extends Component{
	constructor(props){
		super(props);
		/**
		 * this.state 定义的值
		 * adultNum:成人数; childNum:儿童数; adultPrice:成人价; childPrice:儿童价格; reroomPrice:房差价; orderPrice:订单总额;
		 * departDate:出行日期; journeyEndDate:行程结束时间; nextStepObj:团期到预定传递参数
		 */
		this.state = Object.assign({},this.props,{
			LOADINGTIP: false,
			adultNum:this.props.minPersons,
			childNum:"0",
			adultPrice:"",
			childPrice:"",
			reroomPrice:"",
			orderPrice:"",
			departDate:"",
			journeyEndDate:"",
			nextStepObj:null
		});
	}
	//查询团队游单项详情
	singleDetailsJson(departDate,adultNum,childNum){
		/**
		 * params 参数
		 * productId:产品ID;  departDate:出行日期;  adultNum:成人数;  childNum:儿童数; 
		 */
		this.setState({LOADINGTIP:true})
		let paramsObj={
			"productId" : this.state.productId,
			"departDate" : departDate,
			"adultNum" : adultNum,
			"childNum" : childNum
		};
		let params = JSON.stringify(paramsObj);
		getDataFromAPI({
			type:'POST',
			url:'apiserver/tourVacation/singleProductDetail',
			data:params,
			success:(data)=>{
				if(data.code === "1"){
					let groupData = data.data.tourGroupList[0];
					let freeData = data.data.freeOrder;
					this.orderPriceJson(groupData.journeyid, groupData.singleid, groupData.journeyDate, freeData.dateToBack, freeData.adultNum, freeData.childNum, freeData.room);
				}else{
					this.setState({
						LOADINGTIP:false
					})
					Tips({message:data.message});
				}
			},
			error:(data)=>{
				console.log(data);
			}
		});
	}
	//计算订单价格
	orderPriceJson(journeyid,singleid,departDate,journeyEndDate,adultNum,childNum,roomNum){
		/**
		 * params 参数
		 * productId:产品ID; journeyid:行程ID; singleid:单项ID; departDate:出行日期; journeyEndDate:行程结束日期; adultNum:成人数; childNum:儿童数; roomNum:房间数;
		 */
		let paramsObj={
			"productId" : this.state.productId,
			"journeyid" : journeyid,
			"singleid" : singleid,
			"departDate" : departDate,
			"adultNum" : adultNum,
			"childNum" : childNum,
			"roomNum": roomNum
		};

		let params = JSON.stringify(paramsObj);
		getDataFromAPI({
			type:'POST',
			url:'apiserver/tourVacation/getCalculateOrderPrice',
			data:params,
			success:(data)=>{
				if(data.code === "1"){
					let items=data.data.Items[0];
					this.setState({
						LOADINGTIP:false,
						adultNum : items.adultNum,
						childNum : items.childNum,
						adultPrice : items.adultPrice,
						childPrice : items.childPrice,
						reroomPrice : items.reroomPrice,
						orderPrice : data.data.orderPrice,
						departDate : departDate,
						journeyEndDate : journeyEndDate,
						nextStepObj:{
							productId : this.state.productId,
							productPrice : items.adultPrice,
							totalAmount : data.data.orderPrice,
							journeyid : journeyid,
							singleid : singleid,
							journeyStartDate : departDate,
							journeyEndDate : journeyEndDate,
							adultNum : items.adultNum,
							childNum : items.childNum,
							adultPrice : items.adultPrice,
           					childPrice : items.childPrice
						}
					})
				}else{
					alert(data.message);
				}
			},
			error:(data)=>{
				console.log(data);
			}
		});
	}

	//减人数操作,people为成人还是儿童，method为-1是减，1是加
	countNum(people,method){
		let adultNum= parseInt(this.state.adultNum);
		let childNum=parseInt(this.state.childNum);

		if(!this.state.departDate){
			Tips({message:"请您选择出行日期"});
			return false;
		}
		if(people=="adultNum"){
			if((adultNum <= this.state.minPersons && method==-1) || (adultNum >= this.state.maxPersons && method==1)){
				return false;
			}
			this.setState({
				adultNum : adultNum + method,
			},function(){
				this.singleDetailsJson(this.state.departDate,this.state.adultNum,this.state.childNum);
			})
		}else{
			if((childNum <= 0 && method==-1) || (childNum >= adultNum*2 && method==1)){
				return false;
			}
			this.setState({
				childNum : childNum + method,
			},function(){
				this.singleDetailsJson(this.state.departDate,this.state.adultNum,this.state.childNum);
			})
		}
	}

	// 判断是否选择日期
	departDateOR(){
		if(!this.state.departDate){
			Tips({message:"请您选择出行日期"});
			return false;
		}
	}
	render(){
		return  <section className="mg-date">
					{this.state.LOADINGTIP ? <CM.LoadingTip markBlack="true" /> : ""}
					<DATETABLE priceData={this.state.priceData} singleDetailsJson={this.singleDetailsJson.bind(this)} adultNum={this.state.adultNum} childNum={this.state.childNum}/>
					<dl className="mg-date-price">
						<dt>选择购买数量</dt>
						{
							this.state.adultJoin ?
							<dd className="cf">
								<div className="fl">成人 {this.state.adultPrice ? <span className="ml12">¥{this.state.adultPrice}</span> : ""}</div>
								<div className="mg-date-count fr"><a href="javascript:;" onClick={this.countNum.bind(this,"adultNum",-1)}><em className="mg-ico-minus"></em></a><strong>{this.state.adultNum}</strong><a href="javascript:;" onClick={this.countNum.bind(this,"adultNum",1)}><em className="mg-ico-add"></em></a></div>
								{this.state.reroomPrice ? <div className="mg-date-difference fr"><em className="mg-bgs mg-ico-cue"></em>含单房差{this.state.reroomPrice}元</div> :""}
							</dd>
							:
							""
						}
						
						{
							this.state.childJoin ?
							<dd className="cf">
								<div className="fl">儿童 {this.state.childPrice ? <span className="ml12">¥{this.state.childPrice}</span> : ""}</div>
								<div className="mg-date-count fr"><a href="javascript:;" onClick={this.countNum.bind(this,"childNum",-1)}><em className="mg-ico-minus"></em></a><strong>{this.state.childNum}</strong><a href="javascript:;" onClick={this.countNum.bind(this,"childNum",1)}><em className="mg-ico-add"></em></a></div>
							</dd>
							:
							""
						}
						
					</dl>
					<CM.NavBottom Price="true" productId={this.state.productId} orderPrice={this.state.orderPrice} nextStep={this.departDateOR.bind(this)} nextStepObj={this.state.nextStepObj} nextStepTitle="确认产品"/>
				</section>
	}
}


//日历组件
class DATETABLE extends Component{
	constructor(props){
		super(props);
		this.state = {
			DateArr:this.props.priceData,
			MonthArr:[],
			DateMap:{},	
			selectMonth:"", //左右切换选择月份
			selectDate:"0" //选择日期
		};
	}
	componentWillMount(){
		let MonthTemp=[],DateMapTem={};
		this.state.DateArr.map(function(item, index) {
			let YMtemp=item.date.substring(0, 7);
			let Ytemp=item.date.substring(0, 4);
			let Mtemp=item.date.substring(5, 7);
			let nowDate=new Date();
			if(MonthTemp.indexOf(YMtemp)==-1){
				if(Ytemp<=nowDate.getFullYear() && Mtemp<(nowDate.getMonth()+1)){
					return false;
				}
				MonthTemp.push(YMtemp);
			}
			DateMapTem[item.date]=item;
		});
		this.setState({
			MonthArr:MonthTemp,
			DateMap:DateMapTem
		});
	}
	switchMonth(YM){
		if(!YM){
			return false;
		}
		this.setState({
			selectMonth:YM
		})
	}
	selectDay(D,YM){
		this.setState({
			selectDate:YM+"-"+D
		});
		this.props.singleDetailsJson(YM+"-"+D,this.props.adultNum,this.props.childNum);
	}
	render(){
		let DateMapDom=this.state.DateMap;

		let MonthArrMAap=[];

		let showOR,showAnimated;
		for (let i = 0; i < this.state.MonthArr.length; i++) {
			let item=this.state.MonthArr[i];
			let lastItem=(i==0)?false:this.state.MonthArr[i-1];
			let nextItem=(i==this.state.MonthArr.length)?false:this.state.MonthArr[i+1];
			let itemStr=item.replace("-","年")+"月";

			if(!this.state.selectMonth){
				showOR=(i==0)?"":{display:"none"};
			}
			if(this.state.selectMonth==item && this.state.selectMonth){
				showOR={display:"block"};
				showAnimated="mg-fadeIn";
			}
			if(this.state.selectMonth!=item && this.state.selectMonth){
				showOR={display:"none"};
				showAnimated="mg-fadeOut";
			}

			MonthArrMAap.push(
				<div key={i} style={{...showOR}} className={showAnimated}>

					<div className="mg-date-tit cf">
						<a href="javascript:;" className="mg-arrow-l fl" style={i==0 ? {opacity:0.2} : {opacity:1}} onClick={this.switchMonth.bind(this,lastItem)}><em></em></a>
						<a href="javascript:;" className="mg-arrow-r fr" style={i==this.state.MonthArr.length-1 ? {opacity:0.2} : {opacity:1}} onClick={this.switchMonth.bind(this,nextItem)}><em></em></a>
						<strong>{itemStr}</strong>
					</div>
					<div className="mg-date-table">
						<dl className="cf"><dt>日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt>六</dt></dl>
						<dl className="cf">
							<DAYLIST dayItem={item} DateMap={DateMapDom} selectDay={this.selectDay.bind(this)} selectDate={this.state.selectDate} />
							<input id="selectDate" name="selectDate" type="hidden" value={this.state.selectDate} />
						</dl>
					</div>
				</div>
			)
		}
		return  <div>{MonthArrMAap}</div>
	}
}

//单月日历组件
class DAYLIST extends Component{
	constructor(props){
		super(props);
		this.state=this.props;
	}
	setCalendar(date){ //生成日历数组
	   	let DateA=date.split("-");
	    let d= new Date(DateA[0],DateA[1],0).getDate();  
		let wF=setDay(DateA[0],DateA[1],1); //某月第一天是周几
	    let wL=setDay(DateA[0],DateA[1],d); //某月最后一天是周几
	    let nowDate=""; //某天
	    let MonthDOM=[]; //某月日历数组
	    for(let i=0;i<=(wF-1);i++){ //上月余白的日期
	        MonthDOM.push("");
	    }
	    for(let j=1;j<=d;j++){  //本月的日期

	        if(j<=9){
	            j="0"+j;
	        }
	        nowDate=date+"-"+j;
	        if(this.props.DateMap[nowDate]){
	        	MonthDOM.push({
	        		day : j,
	        		price : '¥'+this.props.DateMap[nowDate].price
	        	});
	        }else{
	        	MonthDOM.push({day : j});
	        }
	    }
	    return MonthDOM;

		//取某天是周几，0代表星期七
	    function setDay(y,m,d){  
	        let D1=new Date(y+"/"+m+"/"+d);
	        return D1.getDay();
	    } 
	}
	render(){
		let DayList=this.setCalendar(this.props.dayItem);
		let DayMap=[];

		for(let i=0;i<DayList.length;i++){
			let item=DayList[i];
			if(item){
				if(item.price){
					DayMap.push(
						<dd className="mg-sel" key={i} onClick={this.props.selectDay.bind(this,item.day,this.props.dayItem)}>
							<span className={this.props.selectDate==this.props.dayItem+"-"+item.day ? "mg-click" : ""} >{item.day}<strong>{item.price}</strong></span>
						</dd>
					)
				}else{
					DayMap.push(
						<dd key={i}>
							<span>{item.day}</span>
						</dd>
					)
				}

			}else{
				DayMap.push(<dd key={i}></dd>);
			}
			
		}
		return 	<dl className={this.props.showOR} >
					{DayMap}
				</dl>;
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

export default connect(mapStateToProps,mapDispatchToProps)(DATE);
