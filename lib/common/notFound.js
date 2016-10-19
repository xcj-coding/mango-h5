/**
 * 404页面
 */
import React,{Component} from 'react';
import {MgHeader,NoContent} from '../common/component';

class NotFound extends Component{
	render(){
		return (
			<div className="mg-fadeInRight">
				<MgHeader data={{
					headerTitle:"暂无内容",
					gotoBack:true,
					headerArea:false,
					headerShare:false,
					headerCollect:false,
					headerHome:true,
				}} />
				
				<NoContent title="暂无内容" content="产品完善中 尽请期待" />
			</div>
			
		)
	}
};

export default NotFound;
