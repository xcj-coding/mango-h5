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
	lastMonth(event){
		alert("a");
	}
	nextMonth(event){
		alert("b")
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
								<div className="mg-date-tit cf">
									<a href="javascript:;" className="mg-arrow-l fl" onClick={this.lastMonth}><em></em></a>
									<a href="javascript:;" className="mg-arrow-r fr" onClick={this.nextMonth}><em></em></a>
									<strong>2016年04月</strong>
								</div>
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
			DateArr:[{"date": "2016-07-30","price": 178,"roomPrice": null},{"date": "2016-08-06","price": 178,"roomPrice": null},{"date": "2016-08-13","price": 178,"roomPrice": null},{"date": "2016-08-20","price": 178,"roomPrice": null},{"date": "2016-08-27","price": 178,"roomPrice": null}],
			MonthArr:[]
		};
	}
	componentWillMount(){
		let MonthTemp=[];
		this.state.DateArr.map(function(item, index) {
			if(MonthTemp.indexOf(item.date.substring(0, 7))==-1){
				MonthTemp.push(item.date.substring(0, 7));
			}				
		});
		this.setState({MonthArr:MonthTemp});
	}
	setCalendar(date){
	    var DateArr=date.split("-");
	    var d= new Date(DateArr[0],DateArr[1],0).getDate();  

	    console.log(DateArr);

	    
	}
	render(){
		

		var DateArrDom=this.state.MonthArr.map(function(item, index) {
			this.setCalendar("2016-07");
		});


		return(
			<div>
				<div className="mg-date-table">
                    <dl className="cf"><dt>日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt>六</dt></dl>
                    <dl className="cf">
                        <dd>01</dd><dd>02</dd><dd>03</dd><dd>04</dd><dd>05</dd><dd>06</dd><dd>07</dd>
                        <dd className="mg-sel"><span>08<strong>¥1790</strong></span></dd><dd><span>09</span></dd><dd><span>10</span></dd><dd><span>11</span></dd><dd><span>12</span></dd><dd><span>13</span></dd><dd><span>14</span></dd>
                        <dd className="mg-sel"><span>15<strong>¥1790</strong></span></dd><dd><span>16</span></dd><dd><span>17</span></dd><dd><span>18</span></dd><dd><span>19</span></dd><dd><span>20</span></dd><dd><span>21</span></dd>
                        <dd className="mg-sel"><span>22<strong>¥1790</strong></span></dd><dd><span>23</span></dd><dd><span>24</span></dd><dd><span>25</span></dd><dd><span>26</span></dd><dd><span>27</span></dd><dd><span>28</span></dd>
                        <dd className="mg-sel"><span>29<strong>¥1790</strong></span></dd><dd><span>30</span></dd><dd><span>31</span></dd>
                    </dl>
                </div>
                <div className="mg-date-table">
                    <dl className="cf"><dt>日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt>六</dt></dl>
                    <dl className="cf">
                        <dd>01</dd><dd>02</dd><dd>03</dd><dd>04</dd><dd>05</dd><dd>06</dd><dd>07</dd>
                        <dd className="mg-sel"><span>08<strong>¥1790</strong></span></dd><dd><span>09</span></dd><dd><span>10</span></dd><dd><span>11</span></dd><dd><span>12</span></dd><dd><span>13</span></dd><dd><span>14</span></dd>
                        <dd className="mg-sel"><span>15<strong>¥1790</strong></span></dd><dd><span>16</span></dd><dd><span>17</span></dd><dd><span>18</span></dd><dd><span>19</span></dd><dd><span>20</span></dd><dd><span>21</span></dd>
                        <dd className="mg-sel"><span>22<strong>¥1790</strong></span></dd><dd><span>23</span></dd><dd><span>24</span></dd><dd><span>25</span></dd><dd><span>26</span></dd><dd><span>27</span></dd><dd><span>28</span></dd>
                        <dd className="mg-sel"><span>29<strong>¥1790</strong></span></dd><dd><span>30</span></dd><dd><span>31</span></dd>
                    </dl>
                </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(DATE,DATETABLE);
