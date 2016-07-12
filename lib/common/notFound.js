/**
 * 404页面
 */
import React,{Component} from 'react';

class NotFound extends Component{
	render(){
		return (
			<div>
				<p><img src="i/images/not_found.png" alt="" /></p>
				<p><a href="#/cruise">返回首页</a></p>
			</div>
		)
	}
};

export default NotFound;
