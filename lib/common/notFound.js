/**
 * 404页面
 */
import React,{Component} from 'react';
import {MgHeader} from '../common/component';

class NotFound extends Component{
	render(){
		return (
			<div>
				<MgHeader data={{
					headerTitle:"暂无内容",
					gotoBack:true,
					headerArea:false,
					headerShare:false,
					headerCollect:false,
					headerHome:true,
				}} />
				<aside className="mg-prompt-warp">
					<div className="mg-prompt-box">
						<em className="mg-bgs mg-prompt-ico"></em>
						<h3>暂无内容</h3>
						<h4>产品完善中 尽请期待</h4>
					</div>
				</aside>
			</div>
			
		)
	}
};

export default NotFound;
