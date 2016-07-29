import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {MgHeader,LoadingTip,ListItem,NoContent} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

class LIST extends Component{
	constructor(props){
		super(props);
		document.title = this.props.route.name;
        this.state = Object.assign({},this.props,{
            listData: null,
            requestData: '{"clientIp":"127.0.0.1"}',
        });
	}
	componentWillMount(){
        var self = this;
        getDataFromAPI({
            type:'POST',
            url:'apiserver/tourVacation/getProductList',
            data: self.state.requestData,
            success:function(data){
                self.setState({
                    listData:data,
                    LOADINGTIP:false
                })
            }.bind(this),
            error:function(data){
                this.setState({
                    listData:data,
                    LOADINGTIP:false, 
                })
            }.bind(this)
        })
    }
    updateList(url){
        this.setState({
             requestData: url
        })
    }
    componentDidMount(){
        this.setState({LOADINGTIP:false});
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
                                headerTitle:"产品列表",
                                gotoBack:true,
                                headerArea:false,
                                headerShare:false,
                                headerCollect:false,
                                headerHome:true,
                            }} />
                            <ItemContent listData={this.state.listData}  />
                            <ListNav updateList={this.updateList.bind(this)} />
                        </div>
                    )
                }
			</div>
		)
	}
}
class ItemContent extends Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},this.props,{
            listData: null,
            requestData: '{"clientIp":"127.0.0.1"}',
        });
    }
    componentWillMount(){
       
    }
    updateList(data){
        this.setState({requestData:data});
    }
    render(){
        if(!this.props.listData){
            return false;
        }
        let data = this.props.listData.data;
        return (
            data ? (
                <section className="mg-productlist">
                    <div className="mg-productlist-b">
                        <ListItem areaList={data} />
                    </div>
                </section>
            ) : (
                <NoContent title="请求失败" content="数据请求超时或者错误" />
            ) 
        )
    }
}
class ListNav extends Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},this.props,{
            addr: false,
            price: {
                show: false,
                default: 0
            },
            sort: {
                show: false,
                default: 0
            },
            select: false,
            mask: {
                show: false
            },
            listData: null,
        }) ;
    }
    componentWillMount(){
        
    }
    showAddr(){
        
    }
    priceToggle(){
        let priceStyle = this.state.price;
        priceStyle.show ? this.setState({price:
            {
                show:false,
                default: 0
            },mask:
            {
                show: false
            }}) : this.setState({price:
            {
                show:true,
                default: 0
            },mask:{
                show: true
            }});
        this.props.updateList();
    }
    sortToggle(){
        let sortStyle = this.state.sort;
        sortStyle.show ? this.setState({sort:
            {
                show:false,
                default: 0
            },mask:{
                show: false,
            }}) : this.setState({sort:{
                show:true,
                default: 0
            },mask:{
                show: true
            }});
    }
    selectToggle(){
        this.state.select ? this.setState({select:false,mask:false}) : this.setState({select:true,mask:true});
    }
    maskHandler(){
        this.setState({price:false,sort:false,select:false,mask:false})
    }
    render(){
        let price,sort,select,mask;
        if(this.state.sort.show){
            sort =  <ListSort sortToggle={this.sortToggle.bind(this)} {...this.state} />
        }
        if(this.state.select){
            select = <ListSelect selectToggle={this.selectToggle.bind(this)} {...this.state} />
        }
        return (
            <div>
                 <nav className="mg-nav">
                    <a className="mg-nav-item" href="#/address/" >
                        <em className="mg-bgs mg-ico-filter1"></em>
                        <span className="mg-nav-label">目的地</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.priceToggle.bind(this)} >
                        <em className="mg-bgs mg-ico-filter2"></em>
                        <span className="mg-nav-label">价格区间</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.sortToggle.bind(this)} >
                        <em className="mg-bgs mg-ico-filter3"></em>
                        <span className="mg-nav-label">综合排序</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.selectToggle.bind(this)}>
                        <em className="mg-bgs mg-ico-filter4"></em>
                        <span className="mg-nav-label">筛选</span>
                    </a>
                </nav>
                <Mask  maskHandler={this.maskHandler.bind(this)} mask={this.state.mask}/>
                <ListPrice priceToggle={this.priceToggle.bind(this)} price={this.state.price}  />
                {sort}
                {select}
            </div>
        )
    }
}

class ListPrice extends Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},this.props);
    }
    onListA(e){
        var $a = $(e.target);
        $a.siblings('a').removeClass('active');
        $a.addClass('active');
    }
    render(){
        let priceStyle = this.props.price,priceArr = ['不限','¥1000以下','¥1000-¥2000','¥2001-¥3000','¥3001-¥5000','¥5000以上'];
        return (
            <div>
                {
                    priceStyle.show ? (
                        <section className={
                            classnames('mg-tips-price',{
                              'mg-tips-up': priceStyle.show
                            })
                        }>
                            <h4>价格区间 <span>清除全部</span> </h4>
                            <div className="mg-tips-price-content">
                                {
                                    priceArr.map((item,index) => {
                                        if(priceStyle.default === index){
                                            return <a href="javascript:;" key={index} className="active" onClick={this.onListA.bind(this)} >{item} </a>
                                        }else{
                                            return <a href="javascript:;" key={index}  onClick={this.onListA.bind(this)} >{item}</a>
                                        }
                                        
                                    })
                                }
                            </div>
                            <span onClick={this.props.priceToggle}>确定</span>
                        </section>
                    ) : ""
                }
                
            </div>
        )
    }
}

class ListSort extends Component{
    constructor(props){
        super(props);
    }
    ddClick(e){
        var $d = $(e.target);
        $d.siblings().removeClass('active');
        $d.addClass('active');
        var dthis = this;
        setTimeout(function(){
            dthis.props.sortToggle();
        },2000)
    }
    render(){
        let ddArr = ['综合排序','综合排序','价格从高到低','销量从高到低'];
        return (
            <section className={
                classnames('mg-tips-sort',{
                  'mg-tips-up': this.props.sort
                })}
            >
                <dl>
                    {
                        ddArr.map((d,i) => <ListSortDd ddClick={this.ddClick.bind(this)} key={i} txt={d}/>)
                    }
                </dl>
            </section>
        )
    }
}

class ListSortDd extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
             <dd onClick={this.props.ddClick}>{this.props.txt}</dd>
        )
    }
}


class ListSelect extends Component{
    constructor(props){
        super(props);
        this.state = this.props;
    }
    onListA(e){
        var $a = $(e.target);
        $a.siblings('a').removeClass('active');
        $a.addClass('active');
    }
    render(){
        let monthArr = ['不限','11月','12月','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月'],
            dayArr = ['不限','1天','2天','3天','4天','5天','6天','7天','8天','9天','9天以上'];
        return (
            <section className={
                classnames('mg-tips-select',{
                  'mg-tips-up': this.props.select
                })}
            >
                <h4>筛选 <span>清除选项</span> </h4>
                <div className="mg-tips-select-content">
                    <p>出发时间</p>
                    <div className="mg-tips-select-month">
                        {
                            monthArr.map((item,index) => <ListA key={index} onListA={this.onListA.bind(this)} txt={item} />)
                        }
                    </div>
                    <p>游玩天数</p>
                    <div className="mg-tips-select-day">
                        {
                            dayArr.map((item,index) => <ListA key={index}  onListA={this.onListA.bind(this)} txt={item} /> )
                        }
                    </div>
                </div>
                <span onClick={this.props.selectToggle}>确定</span>
            </section>
        )
    }
}

class ListA extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let maskStyle = this.props.mask;
        return (
            <div>
                {
                    maskStyle.show ? (
                    <a href="javascript:;"  className={
                        classnames({
                          'active': this.props.default
                        })}
                        onClick={this.props.onListA} >{this.props.txt}
                    </a>
                    ) : ''
                }
            </div>
        )
    }
}

class Mask extends Component{
    constructor(props){
        super(props);
        this.state = this.props
    }
    render(){
        let maskStyle = this.props.mask;
        return (
            <div>
                {
                    maskStyle.show ? (<div className={
                        classnames('mg-mark-black','mg-mask-opin')} 
                        onClick ={this.props.maskHandler}>
                    </div>) :''
                }
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
