import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {MgHeader,LoadingTip,ImageBox,NoContent,ListItem} from '../common/component';
import {getDataFromAPI,swiperImgShow,getLocation,Tips} from '../common/base';
import * as MGAction  from '../actions/index';
import {Link} from 'react-router';
class HOME extends Component{
    constructor(props){
        super(props)
        document.title = this.props.route.name
        this.state = this.props,{
            jsonData:null,  //预存数据变量
            getLocationData:"" //定位城市
        };
    }
    componentWillMount(){
        var LBS=window.MgSessionGet("LBS");
        if(LBS){
            this.ajaxAPI(LBS);
        }else{
            //位置定位
            getLocation({
                callback:function(data){
                    let getLocationData=data;
                    this.ajaxAPI(getLocationData);
                    window.MgSessionSet("LBS",getLocationData);
                }.bind(this)
            });
        }
        
    }
    ajaxAPI(getLocationData){
       //返回页面数据
        getDataFromAPI({
            type:'POST',
            url:'apiserver/nengli/touFang',
            data:'{"functionid":"10000001","cityid":"0", "updatetime":"123"}',
            success:function(data){
                this.setState({
                    jsonData:data,  //请求成功数据赋值到变量
                    getLocationData:getLocationData, //取位置
                    LOADINGTIP:false //请求成功关闭loading
                })
            }.bind(this),
            error:function(data){
                this.setState({
                    getLocationData:getLocationData, //取位置
                    LOADINGTIP:false, //请求失败关闭loading
                    AJAXFAILED:true  //请求失败显示失败画面开关
                })
            }.bind(this)
        }) 
    }
    render(){
        let hotData=[],listData=[],getLocation="";

        if(this.state.jsonData){  
            getLocation=this.state.getLocationData;
            hotData=this.state.jsonData.Result[0]; //取当季热门区域数据
            listData=this.state.jsonData.Result; //取其它区域列表数据
            listData.shift();
        }
        /**
         * mg-fadeInRight加载进入动画
         * this.state.LOADINGTIP判断是否载loading
         * this.state.AJAXFAILED判断请求数据失败时显示错误提示
         * HOTPRODUCTS 当季热门
         * PRODUCTSLIST 产品列表
         */
        return (

            <div className="mg-fadeInRight">
                {
                    this.state.LOADINGTIP ? (
                        <LoadingTip />
                    ) : (
                        <div className="mg-fadeInRight">
                            <MgHeader data={{
                                gotoBack:true,
                                headerArea:false,
                                headerShare:false,
                                headerCollect:false,
                                headerHome:true,
                                getLocation:getLocation
                            }}  />
                            {
                                this.state.AJAXFAILED ? 
                                <NoContent title="请求失败" content="数据请求超时或者错误" />
                                :
                                <div>
                                    <HOTPRODUCTS hotData={hotData} />
                                    <PRODUCTSLIST listDate={listData} getLocationData={this.state.getLocationData} />
                                </div> 
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

/* 当季热门组件 */
class HOTPRODUCTS extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
    componentDidMount(){
        // 首页热卖专区切换效果-Swiper
        let swiperlmzq = new Swiper('.mg-hot-swiper',{
            wrapperClass : 'mg-hot-list',
            slideClass : 'mg-hot-box',
            pagination : '.mg-hot-ico',
            bulletActiveClass : 'mg-hot-active',
            loop: true,
            autoplay: 30000,
            onInit: function(swiper){
                //焦点轮播图首尾图不显示问题
                swiperImgShow($(".mg-hot-swiper"));
            }
        })
    }
    render(){
    	// productsLIst当季热门数据
        let productsLIst=this.state.hotData.areaList;
        /**
         * productsLIst.map循环展示当季热门数据
         * ImageBox图片组件，imageUrl图片地址
         */
        return (
            <div>
                {	productsLIst ?
                    <section className="mg-hot">
                    	<h2 className="mg-tit1">{this.state.hotData.areaName}</h2>
                    	<div className="mg-hot-swiper">
                            <div className="mg-hot-list cf">
                                
                                {
                                	productsLIst.map(function(data, index) {
                            			return 	<div className="mg-hot-box" key={index}>
                                                	<a className="mg-hot-img" href={"#/holiday/details/"+data.productId.replace(/p2$/,"")}>
                                                		<ImageBox imageUrl={data.productImageUrl} />
                                                		<h4 className="cf"><span className="fl">出发城市: {data.productStarting}</span></h4>
                                                	</a>
                                                    <h2><a href={"#/holiday/details/"+data.productId.replace(/p2$/,"")}>{data.productCaption}</a></h2>
                                                    <div className="mg-hot-b cf">
                                                    	<div className="fl">								            		
                                                    		<p className="mg-hot-explain">芒果网倾情回馈，让您享受超低的预订价格！</p>
                                                    	</div>
                                                    	<div className="mg-hot-price fr">
                                                    		<strong><sub>￥</sub><em>{data.productPrice}</em> 起</strong>
                                                    		<del>原价：￥{data.productOrignalPrice}</del>
                                                    	</div>
                                                    </div>
                                                </div>;
                                	})
                                }	
                            </div>
                            <div className="mg-hot-ico"></div>
                        </div>
                    </section>
                    : ""
                }
            </div>
            
        )
    }
}

/* 产品列表组件 */
class PRODUCTSLIST extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
    render(){
        let productsLIst=this.state.listDate;
        let getLocationData=encodeURIComponent(this.state.getLocationData);
        /**
         * data.areaType==5;return false;去除热门目的地
         * data.cityList.map产品列表上部分：地区展示
         * ImageBox图片组件，imageUrl图片地址
         * ListItem产品列表下部分：产品展示
         */
        return (
            <div>
                {	productsLIst ?
                    productsLIst.map(function(data, index) {
                		if(data.areaType==5){
                			return false;
                		}
                        return  <section className="mg-productlist" key={index}>
                                    <div className="mg-productlist-t">
                                        <h2 className="mg-tit1 cf">{data.areaName}  <a className="mg-tit1-more fr" href={"#/holiday/list/"+data.areaType}>更多<em className="mg-ico2-sjr"></em></a></h2>
                                        { data.cityList ? 
                                            <ul className="mg-productlist-list1 mg-g">
                                                {
                                                    data.cityList.map(function(dataChild, indexChild) {
                                                        return 	<li className="mg-col mg-col-2" key={indexChild}>
                                                                    <a className="mg-productlist-link" href={"#/holiday/list/"+data.areaType+"/?keyword="+encodeURIComponent(dataChild.cityCaption)}>
                                                                        <ImageBox imageUrl={dataChild.cityPicture} />
                                                                        <strong>{dataChild.cityCaption}</strong>
                                                                    </a>
                                                                </li>;
                                                    })
                                                }
                                            </ul> : ""
                                        }
                                    </div>
                                    { data.areaList ?
                                        <div className="mg-productlist-b">
                                            <ListItem areaList={data.areaList} />
                                        </div> : ""
                                    }
                                </section>;
                    })	
                    :""
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
export default connect(mapStateToProps,mapDispatchToProps)(HOME);