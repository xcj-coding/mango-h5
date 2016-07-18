import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';




class LIST extends Component{
	constructor(props){
		super(props)
		document.title = props.route.name
		this.state = {
		    getData:{},
		    LOADINGTIP:true,
		    hovering:false
		};
	}
	render(){
		return (
			<div>
				{/* 页头 */}
				<MgHeader headerTitle="邮轮列表" gotoBack={true}  search={true} homne={true} />
				
				{/* 列表 */}
		        <section className="mg-lproducts">
		            <div className="mg-lproducts-bx">
		                <a className="cf" href="">
		                    <div className="mg-lproducts-r fr">
		                        <span className="mg-inc-btn1 mg-fs22">限时优惠</span>
		                        <span className="mg-lproducts-logoico"><img src="/i/cruise/tanker-logo1.jpg" /></span>
		                        <h5 className="mg-lproducts-logotit mg-fs20">公主号</h5>
		                    </div>
		                    <div className="mg-lproducts-l">
		                        <h3 className="mg-fs26"><strong className="mg-pr16">公主号</strong>日本长崎+九重+熊本+福冈5日</h3>
		                        <p className="mg-fs24 mg-color-999"><span className="mg-pr16">2016-05-21</span><span>香港上船</span></p>
		                        <p className="mg-color-yellow mg-font-yahei mg-fs32 mg-mt30"><sup className="mg-fs20">￥</sup><span className="mg-font-arial">1200</span>起/人</p>
		                    </div>
		                </a>
		            </div>
		            <div className="mg-lproducts-bx">
		                <a className="cf" href="">
		                    <div className="mg-lproducts-r fr">
		                        <span className="mg-inc-btn1 mg-fs22">限时优惠</span>
		                        <span className="mg-lproducts-logoico"><img src="/i/cruise/tanker-logo1.jpg" /></span>
		                        <h5 className="mg-lproducts-logotit mg-fs20">公主号</h5>
		                    </div>
		                    <div className="mg-lproducts-l">
		                        <h3 className="mg-fs26"><strong className="mg-pr16">公主号</strong>日本长崎+九重+熊本+福冈5日</h3>
		                        <p className="mg-fs24 mg-color-999"><span className="mg-pr16">2016-05-21</span><span>香港上船</span></p>
		                        <p className="mg-color-yellow mg-font-yahei mg-fs32 mg-mt30"><sup className="mg-fs20">￥</sup><span className="mg-font-arial">1200</span>起/人</p>
		                    </div>
		                </a>
		            </div>
		        </section>	
		

			</div>
		)
	}
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LIST);
