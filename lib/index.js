import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom,Slider,NewsList} from './common/common';

import {change} from './actions/index';

// document.title = this.state.name;


class Index extends Component {
  constructor(props){
    super(props)
    document.title = props.route.name
  }
	render(){
		let dispatch = this.props.dispatch;
		return (
			<div>
				<button style={{display:"none"}} onClick={() => dispatch(change())}>切换title</button>
				{this.props.show ? (<div className="block" style={{display:"none"}}>原生态</div>) :
				(<header data-am-widget="header" className="am-header am-header-default" style={{display:"none"}}>
					<h1 className="am-header-title">
						我的APP
					</h1>
				</header>)
				}

        <div className="countdown_div">距离2016高考还有<i className="color_f40_14">1000</i>天<i className="am-icon-gear am-icon-spin my_fr"></i></div>
        <div className="home_square_div">
          <ul>
            <li><i>icon</i><p>院校评估</p></li>
            <li><i>icon</i><p>专业分析</p></li>
            <li><i>icon</i><p>性格测试</p></li>
            <li><i>icon</i><p>高考生活</p></li>
          </ul>
        </div>
        <div className="news_title">最新动态</div>

        <NewsList />

        <NavBottom />
			</div>
		)
	}
};

function select(state){
	return {show:state}
};

export default connect(select)(Index);
