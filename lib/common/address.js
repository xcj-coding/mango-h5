import React,{Component} from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

/**
 * 测试玩玩
 * 测试玩玩
 * 测试玩玩
 */
export class ADDRESS extends Component{
	constructor(props){
		super(props)
		this.state = {
			showAddress: this.props.showAddress,
			jsonData: '',
			LOADINGTIP: true,
			AJAXFAILED: false,
			searchList: [],
			selectCity: this.props.selectCity,
			historyCityArray: []
		}
	}
	componentWillMount(){
		this.ajaxAPI();
	}
	componentDidMount(){
		console.log('载入')
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.showAddress !== this.state.showAddress) {
			this.setState({showAddress:nextProps.showAddress},function(){
				if(this.state.showAddress){
					this.ajaxAPI();
				}
			});
		}
	}
	bindClick(){
		let _this = this;
		let historyCityArrayFn = function(){
			if(_this.state.historyCityArray.indexOf(_this.state.selectCity) === -1){
				_this.state.historyCityArray.unshift(_this.state.selectCity);
				_this.state.historyCityArray.length = 3;
			}else{
				for(let i = 0; i < _this.state.historyCityArray.length; i++){
					if(_this.state.historyCityArray[i] == _this.state.selectCity){
						_this.state.historyCityArray.splice(i,1);
						_this.state.historyCityArray.unshift(_this.state.selectCity);
					}
				}
			}
		}

		$(".mg-addressList").off("click").on("click","a",function(){
			let val = $(this).text();
			_this.setState({selectCity:val},()=>{
				_this.props.selectCityFn(val);
				_this.props.handleSelectClass();
				historyCityArrayFn();

			})
		});
		$(".mg-addressListData").off("click").on("click","a",function(){
			let val = $(this).text();
			_this.setState({selectCity:val},()=>{
				_this.props.selectCityFn(val);
				_this.props.handleSelectClass();
				historyCityArrayFn();
			})
		});
		$(".mg-addressSearchList").off("click").on("click","a",function(){
			let val = $(this).text();
			_this.setState({selectCity:val},()=>{
				_this.props.selectCityFn(val);
				_this.props.handleSelectClass();
				historyCityArrayFn();
			})
		});
		$(".mg-addressSearch input").off("keyup").on("keyup",function(){
			console.log($(this).val());
			let txtVal = $(this).val();
			let searchList = [];
			let reg = new RegExp('^' + txtVal,'gi');
			if(txtVal !== ''){
				for(let item of _this.state.jsonData.countries){
					if(reg.test(item.ename)){
						searchList.push(item)
					}
				}
			}
			console.log(searchList);
			_this.setState({searchList:searchList})
		});
		$(".mg-addressNav").off("click").on("click","li",function(){
			let nowTag = $(this).text();

			if(nowTag == 'top'){
				document.querySelector(".mg-address-select").scrollTop = 0;
			}
			$(".mg-addressListData-cont h3").each(function(index){
				let top = $(".mg-addressListData-cont h3").eq(index).offset().top
				if($(".mg-addressListData-cont h3").eq(index).text() == nowTag){
					document.querySelector(".mg-address-select").scrollTop += top;
					console.log(top);
				}
			})
		});
		// 清空
		$(".mg-addressList").off("click.rm").on("click.rm",".mg-addressHistory-rm",function(){
			// $(this).parents(".mg-addressList").hide();
			_this.setState({historyCityArray:[]});
		})
	}
	ajaxAPI (){
		getDataFromAPI({
			type:'POST',
			url:'apiserver/visa/getCountries',
			success:(data)=>{
				if(data.code === "1"){
					this.setState({
						LOADINGTIP:false,
						jsonData:data.data
					})
					this.bindClick();
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
	render(){
		let data,
			aNav = [],
			newList = {},
			countryList = [];
		if(this.state.jsonData){
			data = this.state.jsonData;

			for(let item of data.countries){
				if(!aNav.includes(item.firstLetter) && item.firstLetter){
					aNav.push(item.firstLetter)
				}
			}
			aNav.sort();

			for(let i of aNav){
				newList[i] = [];
				for(let item of data.countries){
					if(item.firstLetter == i){
						newList[i].push(item);
					}
				}
			}

			for(let k in newList){
				let countryListLi = []
				newList[k].map(function(item,i){
					countryListLi.push(<li key={k + i}><a href="javascript:;">{item.name}</a></li>) 
				})
				countryList.push(<div className="mg-addressListData-cont" key={k}><h3 key={k + 'h3'}>{k}</h3><ul key={k + 'ul'}>{countryListLi}</ul></div>)
			}
		}
		// <div className={this.state.showAddress ? 'mg-fadeInRight' : 'mg-fadeOutRight'}>
		return (
			<div>
			{
				this.state.LOADINGTIP ? (
					<CM.LoadingTip />
				) : (
				<div style={{"position":"fixed","top":"0px","overflowY":"scroll"}} className={this.state.showAddress ? 'mg-fadeInRight' : 'mg-fadeOutRight'}>
					{
						(!this.state.AJAXFAILED && data) ? (
							<div className="mg-address-select">
								<header className="mg-header">
									<a className="mg-header-close" href="javascript:;" onClick={this.props.handleSelectClass.bind(this)}><em className="mg-ico-sjl"></em></a>
									<h1>{'选择城市'}</h1>
								</header>
								<div className="mg-addressSearch">
									<input type="text" placeholder="输入城市名（如北京bj）" />
									<div className="mg-addressSearchList">
										{
											(this.state.searchList.length > 0) ? 
												<h3>{this.state.searchList[0].firstLetter}</h3>
											: 
												null
										}
										<ul>
										{
											this.state.searchList.map(function(item,i){
												return (<li key={i}><a href="javascript:;">{item.name}</a></li>)
											})
										}
										</ul>
									</div>
								</div>
								<div className="mg-addressList">
									<div className="mg-addressListCont">
										<p>当前定位城市</p>
										<ul>
											<li><a href="javascript:;">深圳</a></li>
										</ul>
									</div>
								</div>
								<div className="mg-addressList">
									<div className="mg-addressListCont">
									<p>历史选择<span className="mg-addressHistory-rm" href="javascript:;">清空</span></p>
										<ul>
											{
												this.state.historyCityArray.map((item,i)=>{
													return (
														<li key={i}><a href="javascript:;">{item}</a></li>
													)
												})
											}
										</ul>
									</div>
								</div>
								<div className="mg-addressList mg-addressList-last">
									<div className="mg-addressListCont">
									<p>热门城市</p>
										<ul>
											{
												data.hot.map((item,i)=>{
													return (
													<li key={i}><a name={item.code} href="javascript:;">{item.name}</a></li>
													)
												})
											}
										</ul>
									</div>
								</div>
								<div className="mg-addressListData">
										{
											countryList
										}
								</div>
								<div className="mg-addressNav">
									<ul>
										<li>top</li>
										<li>a</li>
										<li>b</li>
										<li>c</li>
										<li>d</li>
										<li>e</li>
										<li>f</li>
										<li>g</li>
										<li>h</li>
										<li>i</li>
										<li>j</li>
										<li>k</li>
										<li>l</li>
										<li>m</li>
										<li>n</li>
										<li>o</li>
										<li>p</li>
										<li>q</li>
										<li>r</li>
										<li>s</li>
										<li>t</li>
										<li>u</li>
										<li>v</li>
										<li>w</li>
										<li>x</li>
										<li>y</li>
										<li>z</li>
									</ul>
								</div>
							</div>
						) : (
							<div className="mg-address-select">
								<header className="mg-header">
									<a className="mg-header-close" href="javascript:;" onClick={this.props.handleSelectClass.bind(this)}><em className="mg-ico-sjl"></em></a>
									<h1>{'选择城市'}</h1>
								</header>
								<CM.NoContent title="请求失败" content="数据请求超时或者错误" />
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









