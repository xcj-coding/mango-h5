import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class DATE extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props;
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.setState({LOADINGTIP:false});
	}
	render(){
		return (
			<div className="mg-fadeInRight">
				{
					this.state.LOADINGTIP ? (
						<LoadingTip />
					) : (
						<div>
							<MgHeader data={{
								headerTitle:"选择日期和人数",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:true,
							}} />
							
							<header className="mg-pageheader">
								<h2>[五一假期]香港直飞沙巴5天4晚自由行（含五星级店，含接送机）</h2>
								<div className="mg-pageheader-price"><sub>￥</sub><em>760</em> 起</div>
							</header>

							<section className="mg-date">
								<DATETABLE />
								<dl className="mg-date-price">
									<dt>选择购买数量</dt>
									<dd className="cf">
										<div className="fl">成人 <span className="ml12">¥1790</span></div>
										<div className="mg-date-count fr"><a href="javascript:;"><em className="mg-ico-minus"></em></a><strong>11</strong><a href="javascript:;"><em className="mg-ico-add"></em></a></div>
										<div className="mg-date-difference fr"><em className="mg-bgs mg-ico-cue"></em>含单房差900元</div>
									</dd>
									<dd className="cf">
										<div className="fl">儿童 <span className="ml12">¥1790</span></div>
										<div className="mg-date-count fr"><a href="javascript:;"><em className="mg-ico-minus"></em></a><strong>11</strong><a href="javascript:;"><em className="mg-ico-add"></em></a></div>
									</dd>
								</dl>
							</section>
							<aside className="mg-buy-bottom fc">
								<div className="mg-buy-bottom-l fl"><span>总额</span><sub>¥</sub><strong>4480</strong></div>
								<div className="mg-buy-bottom-r fr"><span>下一步</span> 确认产品</div>
							</aside>
						</div>
					)
				}
			</div>
		)
	}
}

class DATETABLE extends Component{
	constructor(props){
		super(props);
		this.state = {
			DateArr:[{"date": "2016-06-28","price": 178,"roomPrice": null},{"date": "2016-07-30","price": 178,"roomPrice": null},{"date": "2016-08-06","price": 178,"roomPrice": null},{"date": "2016-08-13","price": 178,"roomPrice": null},{"date": "2016-08-20","price": 178,"roomPrice": null},{"date": "2016-08-27","price": 178,"roomPrice": null},{"date": "2016-09-27","price": 178,"roomPrice": null}],
			MonthArr:[],
			DateMap:{},	
			selectMonth:"", //左右切换选择月份
			selectDate:"0" //选择日期
		};
	}
	componentWillMount(){
		let MonthTemp=[],DateMapTem={};
		this.state.DateArr.map(function(item, index) {
			var YMtemp=item.date.substring(0, 7);
			var Ytemp=item.date.substring(0, 4);
			var Mtemp=item.date.substring(5, 7);
			var nowDate=new Date();
			if(MonthTemp.indexOf(YMtemp)==-1){
				if(Ytemp<=nowDate.getFullYear() && Mtemp<(nowDate.getMonth()+1)){
					return false;
				}
				MonthTemp.push(YMtemp);
			}
			DateMapTem[item.date]=item;
		});
		this.setState({MonthArr:MonthTemp,DateMap:DateMapTem});
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
	}
	render(){
		var DateMapDom=this.state.DateMap;
		var MonthArrMAap=[];
		for (var i = 0; i < this.state.MonthArr.length; i++) {
			var item=this.state.MonthArr[i];
			var lastItem=(i==0)?false:this.state.MonthArr[i-1];
			var nextItem=(i==this.state.MonthArr.length)?false:this.state.MonthArr[i+1];
			var itemStr=item.replace("-","年")+"月";

			if(!this.state.selectMonth){
				var showOR=(i==0)?"":{display:"none"};
			}
			if(this.state.selectMonth==item && this.state.selectMonth){
				var showOR={display:"block"};
				var showAnimated="mg-fadeIn";
			}
			if(this.state.selectMonth!=item && this.state.selectMonth){
				var showOR={display:"none"};
				var showAnimated="mg-fadeOut";
			}

			MonthArrMAap.push(
				<div key={i} style={{...showOR}} className={showAnimated}>

					<div className="mg-date-tit cf">
						<a href="javascript:;" className="mg-arrow-l fl" onClick={this.switchMonth.bind(this,lastItem)}><em></em></a>
						<a href="javascript:;" className="mg-arrow-r fr" onClick={this.switchMonth.bind(this,nextItem)}><em></em></a>
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


class DAYLIST extends Component{
	constructor(props){
		super(props);
	}
	setCalendar(date){ //生成日历数组
	   	var DateA=date.split("-");
	    var d= new Date(DateA[0],DateA[1],0).getDate();  
		var wF=setDay(DateA[0],DateA[1],1); //某月第一天是周几
	    var wL=setDay(DateA[0],DateA[1],d); //某月最后一天是周几
	    var nowDate=""; //某天
	    var MonthDOM=[]; //某月日历数组

	    for(var i=0;i<=(wF-1);i++){ //上月余白的日期
	        MonthDOM.push("");
	    }
	    for(var j=1;j<=d;j++){  //本月的日期

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
	        var D1=new Date(y+"/"+m+"/"+d);
	        return D1.getDay();
	    } 
	}
	render(){
		var DayList=this.setCalendar(this.props.dayItem);
		var DayMap=[];

		for(var i=0;i<DayList.length;i++){
			var item=DayList[i];
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

export default connect(mapStateToProps,mapDispatchToProps)(DATE,DATETABLE,DAYLIST);
