/**
 * 404页面
 */
import React,{Component} from 'react';

class NotFound extends Component{
	render(){
		return (
			<div className="ct" style={{width:600,margin:"80px auto"}}>
				<p className="load"><img src="i/images/not_found.png" alt=""/></p>
				<p><a href="/" className="cr5 ft14">返回首页</a></p>
			</div>
		)
	}
};

export default NotFound;
