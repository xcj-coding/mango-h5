import {connect} from 'react-redux';
import React,{Component} from 'react';
import {Link} from 'react-router';

import * as AMUI from 'amazeui-touch';

// loading状态
export class LoadingTip extends Component {
	render(){
		return (
			<div>
				<AMUI.Modal role="loading" isOpen={true} />
			</div>
		)
	}
}

// 页头
export class MgHeader extends Component {
	render(){
		return (
			<header className="mg-header mg-pos-r">
				{
					this.props.gotoBack ? <a href="javascript:history.back(-1);" className="mg-header-return mg-pos-a mg-vertical-align"><em className="mg-bgs mg-text-hidden mg-vertical-align-middle">返回</em></a> : ''
				}
			    <h1 className="mg-header-title text-center mg-fs32">{this.props.headerTitle}</h1>
			    <div className="mg-header-r mg-pos-a cf">
			        <a className="mg-header-link mg-fs26 fr" href="">我的订单</a>
			        <a className="mg-header-search mg-vertical-align fr" href=""><em className="mg-bgs mg-text-hidden mg-vertical-align-middle">搜索</em></a>
			    </div>
			</header>
		)
	}
}



// 底部菜单
export class NavBottom extends Component {
	render(){
		return (
			<div data-am-widget="navbar" className="am-navbar am-cf" id="" style={{'borderTop':'1px solid #e0e0e0','backgroundColor':'#fff'}}>
			    <ul className="am-navbar-nav am-cf am-avg-sm-4">
			        <li>
			          <a href="#/cruise">
			              <span className="am-icon-user" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>游轮</span>
			          </a>
			        </li>
			    </ul>
			</div>
		)
	}
}

