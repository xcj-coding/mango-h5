import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class RESERVE extends Component{
    constructor(props){
        super(props)
        document.title = this.props.route.name
        this.state = this.props;
    }
    componentWillMount(){
        this.setState({LOADINGTIP:false});
    }
    componentDidMount(){


    }
    render(){
        return (
            <div className="mg-fadeInRight">
                {
                    this.state.LOADINGTIP ? (
                        <LoadingTip />
                    ) : (
                        <div>
                            <MgHeader data={{
                                headerTitle:"选择日期和人数",
                                gotoBack:true,
                                headerArea:false,
                                headerShare:false,
                                headerCollect:false,
                                headerHome:true,
                            }} />
                            
                            <header className="mg-pageheader">
                                <h2>[五一假期]香港直飞沙巴5天4晚自由行（含五星级店，含接送机）</h2>
                                <div className="mg-pageheader-explain cf">
                                    <span className="fl">出发时间：2015-01-12 22:31<br/>乘机人数：2个成人</span>
                                    <span className="fr">编号：1646112</span>
                                </div>
                            </header>

                            <section className="mg-pageheader-diff cf">
                                <span className="fl">单房差</span>
                                <strong className="fr">¥400</strong>
                            </section>

                             <section className="mg-reserve">
                                <dl className="mg-form1">
                                    <dt>预定人信息</dt>
                                    <dd><label>姓名</label><input type="text" name="" placeholder="请输入真实姓名" /></dd>
                                    <dd><label>电话</label><input type="text" name="" placeholder="必填，用于接收订单确认信息" /></dd>
                                    <dd><label>邮箱</label><input type="text" name="" placeholder="选填，用于接收旅游合同" /></dd>
                                </dl>
                                <p className="mg-notice">点击“提交订单”表示已阅读同意<a className="mg-cff7e00" href="">产品预定须知</a></p>
                            </section>

                            <section className="mg-detail-msg">
                                <h2>费用明细</h2>
                                <h3>基本团费</h3>
                                <ul>
                                    <li className="cf"><strong>成人</strong><span>￥2060</span><span>x1人</span></li>
                                    <li className="cf"><strong>儿童</strong><span>￥2060</span><span>x1人</span></li>
                                    <li className="cf"><strong>房差价</strong><span>￥2060</span></li>
                                </ul>
                                <p>注：每间房的入住人数低于标准入住人数，你需要支付单房差价</p>
                            </section>

                             <aside className="mg-buy-bottom fc">
                                <div className="mg-buy-bottom-l fl"><span>总额</span><sub>¥</sub><strong>4480</strong></div>
                                <a className="mg-detail-btn" href="javascript:;">费用明细</a>
                                <div className="mg-buy-bottom-r fr"><span>下一步</span> 确认产品</div>
                            </aside>   
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE'),
        XXX:state.Holiday.get('XXX')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RESERVE);
