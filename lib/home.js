import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom} from './common/component';

import {change} from './actions/index';
import {getDataFromAPI} from './common/base';

class Home extends Component {
	constructor(props){
		super(props)
		document.title = props.route.name
	}
	componentWillMount(){
		getDataFromAPI({
			url: 'www.baidu.com',
			method: 'post',
			data: '{"a":"123","b":"456"}',
			callback: function(data){
				console.log(data);
			}
		});
	}
	render(){
		let dispatch = this.props.dispatch;
		return (
			<div>
				<button onClick={() => dispatch(change())}>切换title</button>
				{this.props.show ? (<div className="block">title状态1</div>) :
				(<header data-am-widget="header" className="am-header am-header-default">
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
        <NavBottom />
		</div>
		)
	}
};

function select(state){
	return {show:state}
};

export default connect(select)(Home);
