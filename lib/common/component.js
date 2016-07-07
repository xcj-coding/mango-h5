import {connect} from 'react-redux';
import React,{Component} from 'react';
import * as AMUI from 'amazeui-touch';

// loading状态
export class LoadingTip extends Component {
	render(){
		return (
			<AMUI.Modal role="loading" isOpen={true} />
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

