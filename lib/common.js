import {connect} from 'react-redux';
import React,{Component} from 'react';

// 头部title（可带搜索和返回，看需求添加）
export class TitleTop extends Component {
	render(){
		return (
			<div class="top_title">哈哈</div>
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
			          <a href="#/home">
			              <span className="am-icon-home" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>首11页</span>
			          </a>
			        </li>
			        <li>
			          <a href="#/t1">
			              <span className="am-icon-newspaper-o" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>资讯</span>
			          </a>
			        </li>
			        <li>
			          <a href="#/t2">
			              <span className="am-icon-cubes" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>测评</span>
			          </a>
			        </li>
			        <li>
			          <a href="#/t3">
			              <span className="am-icon-user" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>我的</span>
			          </a>
			        </li>
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

// 图片滚播
export class Slider extends Component {
	render(){
		return (
			<div data-am-widget="slider" className="am-slider am-slider-a2" data-am-slider="">
				<div className="am-viewport">
					<ul className="am-slides">
						<li>
							<img src="./i/images/not_img.jpg" draggable="false" />
						</li>
						<li>
							<img src="./i/images/not_img.jpg" draggable="false" />
						</li>
						<li>
							<img src="./i/images/not_img.jpg" draggable="false" />
						</li>
						<li>
							<img src="./i/images/not_img.jpg" draggable="false" />
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

// 资讯列表
export class NewsList extends Component {
	render(){
		return (
			<div className="news_list">
			  <ul>
			    <li>
			        <img src="./i/images/not_img.jpg" />
			        <div className="news_div">
			          <h5>The history the router should listen to from the history package.</h5>
			          <p>When the router is ready to render a branch of route components, it will use this function to create the elements. You may want to take control of creating the elements when you are using some sort of data abstraction, like setting up subscriptions to stores, or passing in some sort of application module to each component via props.</p>
			        </div>
			    </li>
			    <li>
			        <img src="./i/images/not_img.jpg" />
			        <div className="news_div">
			          <h5>The history the router should listen to from the history package.</h5>
			          <p>When the router is ready to render a branch of route components, it will use this function to create the elements. You may want to take control of creating the elements when you are using some sort of data abstraction, like setting up subscriptions to stores, or passing in some sort of application module to each component via props.</p>
			        </div>
			    </li>
			    <li>
			        <img src="./i/images/not_img.jpg" />
			        <div className="news_div">
			          <h5>The history the router should listen to from the history package.</h5>
			          <p>When the router is ready to render a branch of route components, it will use this function to create the elements. You may want to take control of creating the elements when you are using some sort of data abstraction, like setting up subscriptions to stores, or passing in some sort of application module to each component via props.</p>
			        </div>
			    </li>
			    <li>
			        <img src="./i/images/not_img.jpg" />
			        <div className="news_div">
			          <h5>The history the router should listen to from the history package.</h5>
			          <p>When the router is ready to render a branch of route components, it will use this function to create the elements. You may want to take control of creating the elements when you are using some sort of data abstraction, like setting up subscriptions to stores, or passing in some sort of application module to each component via props.</p>
			        </div>
			    </li>
			  </ul>
			</div>
		)
	}
}

