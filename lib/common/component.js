import {connect} from 'react-redux';
import React,{Component} from 'react';
import {Link} from 'react-router';


// loading状态
export class LoadingTip extends Component {
	render(){
		return (
			<div>
				<div className="mg-mark"></div>
				<div className="mg-loading"><img src="/i/loading.gif" /></div>
			</div>
		)
	}
}

// 页头
export class MgHeader extends Component {
	render(){
		return (
			<header className="mg-header">
				{
					this.props.data.gotoBack ? <a className="mg-header-close" href="javascript:history.back(-1);"><em className="mg-ico-sjl"></em></a> : ''
				}
				{
					this.props.data.headerTitle ? <h1>{this.props.data.headerTitle}</h1> : (
						<div className="mg-header-search">
							<strong>跟团游</strong>
							<input type="text" placeholder="目的地或关键字" />
						</div>
					) 
				}
			    <div className="mg-header-r">
			    	{
			    		this.props.data.headerArea ? <a className="mg-header-area" href=""><spam>深圳</spam><em className="mg-ico-sjb"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerShare ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-share"></em></a>  : ''
			    	}
			    	{
			    		this.props.data.headerCollect ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-collect"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerHome ? <a className="mg-bgs mg-ico-home" href="javascript:;"></a> : ''
			    	}
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

