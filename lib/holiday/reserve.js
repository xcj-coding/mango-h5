import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

/*
 * 产品预定
 * proName:产品名称; adultNum:成人数; childNum:儿童数; adultPrice:成人价; childPrice:儿童价; tourprice:单房差价格; productPrice:产品价格 totalAmount:产品总价格; 
 * linkMan:预定人姓名; linkMobile:预定人电话; memberMail:预定人邮箱; ordercd:订单编号; result:返回结果,1为成功，2为失败;
**/
class RESERVE extends Component{
    constructor(props){
        super(props)
        document.title = this.props.route.name
        this.state = Object.assign({},this.props.location.state,{
            proName:"",
            tourprice:"",
            productPrice:"",
            totalAmount:"",
            linkMan:"",
            linkMobile:"",
            memberMail:"",
            ordercd:"",
            result:"",
            gotoBackShow:true //显示返回按钮
        });
    }
    componentWillMount(){
        this.singleDetailsJson(this.state.journeyStartDate,this.state.adultNum,this.state.childNum);
    }
    //查询团队游单项详情
    singleDetailsJson(departDate,adultNum,childNum){
        /**
         * params 参数
         * productId:产品ID;  departDate:出行日期;  adultNum:成人数;  childNum:儿童数; 
         */
        //this.setState({LOADINGTIP:true})
        let paramsObj={
            "productId" : this.state.productId,
            "departDate" : departDate,
            "adultNum" : adultNum,
            "childNum" : childNum
        };

        let params = JSON.stringify(paramsObj);
        getDataFromAPI({
            type:'POST',
            url:'apiserver/tourVacation/singleProductDetail',
            data:params,
            success:(data)=>{
                if(data.code === "1"){
                    this.setState({
                        proName:data.data.tourGroupList[0].proName,
                        tourprice:data.data.tourGroupList[0].tourprice,
                        productPrice:"10",
                        totalAmount:data.data.freeOrder.totalSalePrice,
                        LOADINGTIP:false
                    })
                }else{
                    this.setState({
                        LOADINGTIP:false
                    })
                    Tips({message:data.message});    
                }
                
            },
            error:(data)=>{
                console.log(data);
            }
        });
    }
    //验证表单与创建订单
    nextStep(){
        let regForm=this.regForm(this.state.linkMan,this.state.linkMobile,this.state.memberMail);
        if(regForm){
            /*  创建订单
             *  productId  产品ID  
             *  productPrice:产品价格 
             *  totalAmount:产品总价格;
             *  journeyid   行程ID
             *  singleid    单项ID
             *  travelDate   产品开始日期
             *  backDate 产品结束日期
             *  startDate    行程开始日期
             *  endDate  行程结束日期
             *  adultNum    成人数
             *  childNum    儿童数
             *  linkMan 联系人名称
             *  linkMobile  联系人手机号码
             *  memberMail  会员邮箱
             *  memberScore 会员积分
             **/
            let paramsObj={
                "productID" : this.state.productId.toString(),
                "productPrice" : this.state.productPrice.toString(),
                "totalAmount" : this.state.totalAmount.toString(),
                "journeyid" : this.state.journeyid.toString(),
                "singleid" : this.state.singleid.toString(),
                "travelDate" : this.state.journeyStartDate.toString(),
                "backDate" : this.state.journeyEndDate.toString(),
                "adultNum" : this.state.adultNum.toString(),
                "childNum" : this.state.childNum.toString(),
                "linkMan" : this.state.linkMan.toString(),
                "linkMobile" : this.state.linkMobile.toString(),
                "memberMail" : this.state.memberMail.toString(),
                "memberScore": "0"
            };
            let params = JSON.stringify(paramsObj);
            getDataFromAPI({
                type:'POST',
                url:'apiserver/tourVacation/createOrder',
                data:params,
                success:(data)=>{
                    if(data.code==1){
                        this.setState({
                            result:1,
                            gotoBackShow:false,
                            ordercd:data.data.ordercd
                        }) 
                   }else{
                        this.setState({
                            gotoBackShow:false,
                            result:2
                        })
                   }
                    
                },
                error:(data)=>{
                    this.setState({
                        gotoBackShow:false,
                        result:2
                    })
                }
            });
        }
       
    }
    //验证表单
    regForm(name,tel,mail){
        let nameReg=/^[\u4e00-\u9fa5]{2,}$/i;
        let Treg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|145|147|149)\d{8}$/;
        let Mreg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!$.trim(name)){
            Tips({message:"请填写预订人姓名"});       
            return false;
        }
        if(!nameReg.test(name)){
            Tips({message:"请正确填写预订人姓名"});    
            return false;
        }
        if(!$.trim(tel)){
            Tips({message:"请填写手机号码"});       
            return false;
        }
        if(!Treg.test(tel)){
            Tips({message:"请正确填写手机号码"});    
            return false;
        }
        if($.trim(mail)){
            if(!Mreg.test(mail)){
                Tips({message:"请正确填写邮箱"});    
                return false;
            }
        }
        return true;
    }
    //表单双向绑定 mold=linkMan为姓名，mold=linkMobile为电话，mold=memberMail为邮箱
    reserveInput(e){
        let mold = e.target.name;
        if(mold=="linkMan"){
            this.setState({
                linkMan : e.target.value
            });
        }else if(mold=="linkMobile"){
            this.setState({
                linkMobile : e.target.value
            });
        }else if(mold=="memberMail"){
            this.setState({
                memberMail : e.target.value
            })
        }
    }

    render(){
        //PriceDetails费用明细
        let PriceDetails={
            adultPrice:this.state.adultPrice,
            adultNum:this.state.adultNum,
            childPrice:this.state.adultPrice,
            childNum:this.state.childNum,
            tourprice:this.state.tourprice
        }

        return (
            <div className="mg-fadeInRight">
                {
                    this.state.LOADINGTIP ? (
                        <CM.LoadingTip />
                    ) : (
                        <div>
                            <CM.MgHeader data={{
                                headerTitle:"确认产品",
                                gotoBack:this.state.gotoBackShow,
                                headerArea:false,
                                headerShare:false,
                                headerCollect:false,
                                headerHome:true,
                            }} />
                            
                            {
                                !this.state.result ?
                                <div>
                                    <header className="mg-pageheader">
                                        <h2>{this.state.proName}</h2>
                                        <div className="mg-pageheader-explain cf">
                                            <span className="fl">出发时间：{this.state.journeyStartDate}<br/>预定人数：{this.state.adultNum}个成人,{this.state.childNum}个儿童</span>
                                            <span className="fr">编号：1646112</span>
                                        </div>
                                    </header>

                                    {
                                        this.state.tourprice ? 
                                        <section className="mg-pageheader-diff cf">
                                            <span className="fl">单房差</span>
                                            <strong className="fr">¥{this.state.tourprice}</strong>
                                        </section>
                                        :
                                        ""
                                    }

                                    <section className="mg-reserve">
                                        <dl className="mg-form1">
                                            <dt>预定人信息</dt>
                                            <dd><label>姓名</label><input type="text" name="linkMan" placeholder="请输入真实姓名" defaultValue={this.state.linkMan} onChange={this.reserveInput.bind(this)} /></dd>
                                            <dd><label>电话</label><input type="text" name="linkMobile" placeholder="必填，用于接收订单确认信息" defaultValue={this.state.linkMobile} onChange={this.reserveInput.bind(this)} /></dd>
                                            <dd><label>邮箱</label><input type="text" name="memberMail" placeholder="选填，用于接收旅游合同" defaultValue={this.state.memberMail} onChange={this.reserveInput.bind(this)} /></dd>
                                        </dl>
                                        {/*<p className="mg-notice">点击“提交订单”表示已阅读同意<a className="mg-cff7e00" href="">产品预定须知</a></p>*/}
                                    </section>
                                    <CM.NavBottom Price="true" productId={this.state.productId} orderPrice={this.state.totalAmount} nextStep={this.nextStep.bind(this)} PriceDetails={PriceDetails} nextStepTitle="提交订单"/>
                                </div>
                                :
                                <ReserveResult result={this.state.result} proName={this.state.proName} journeyStartDate={this.state.journeyStartDate} adultNum={this.state.adultNum} childNum={this.state.childNum} totalAmount={this.state.totalAmount} ordercd={this.state.ordercd} productId={this.state.productId} />

                            }
                            
                        </div>
                    )
                }
            </div>
        )
    }
}

/*结果提示
 * result:预定返回结果,1为成功，2为失败
 * proName:产品名称
 * journeyStartDate:出行日期
 * adultNum:成人数 
 * childNum：儿童数
 * totalAmount：产品总价
 * ordercd：产品编号
 * productId 产品ID
 **/
class ReserveResult extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
    render(){
        return (
            <div >
                <section className="mg-result-t">
                    
                    {
                        this.state.result == 1 ?
                        <div>
                            <em className="mg-result-ico"><img src="../i/icon-order-success.png" width="100%" /></em>
                            <h4 className="mg-cff7e00">恭喜您，预订成功！</h4>
                            <p>我们会尽快确认您的订单</p>
                        </div>
                        :
                        <div>
                            <em className="mg-result-ico"><img src="../i/icon-order-failed.png" width="100%" /></em>
                            <h4>很遗憾，预订失败！</h4>
                            <Link className="mg-result-btn" to={"/holiday/details/" + this.state.productId.replace(/p2$/,"")} >重新预定</Link>
                        </div>
                    }
                    <a className="mg-result-tel" href="tel:40066-40066">芒果网热线：40066-40066</a>
                </section>
                <section className="mg-result-b">
                    <dl>
                        <dt>预订信息</dt>
                        <dd className="cf"><strong>预订产品：</strong><p>{this.state.proName}</p></dd>
                        {
                            this.state.ordercd ?
                            <dd className="cf"><strong>订单编号：</strong><p>{this.state.ordercd}</p></dd>
                            :
                            ""
                        }
                        <dd className="cf"><strong>出发日期：</strong><p>{this.state.journeyStartDate}</p></dd>
                        <dd className="cf"><strong>预定人数：</strong><p>{this.state.adultNum || 0}个成人,{this.state.childNum || 0}个儿童</p></dd>
                    </dl>
                </section>
                <section className="mg-pageheader-diff cf">
                    <span className="fl">订单总额</span>
                    <strong className="fr">¥{this.state.totalAmount || 0}</strong>
                </section>
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
