/**
 * 404页面
 */
import React,{Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NotFound extends Component{
	render(){
		return (
				<ReactCSSTransitionGroup component="em" transitionName="example" transitionEnterTimeout={100} transitionLeaveTimeout={900}>
				<p><img src="i/images/not_found.png" alt="" /></p>
				<p><a href="／">返回首页</a></p>
				</ReactCSSTransitionGroup>
		)
	}
};

export default NotFound;
