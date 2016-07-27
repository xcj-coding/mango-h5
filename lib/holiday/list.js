import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip,ListItem} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

class LIST extends Component{
	constructor(props){
		super(props);
		document.title = this.props.route.name;
		this.state = this.props;
	}
	componentWillMount(){

	}
    componentDidMount(){
        this.setState({LOADINGTIP:false})
    }
    filterClick(){
        alert(1);
    }
    priceClick(){
        alert(2);
    }
    sortClick(){
        alert(3);
    }
    selectClick(){
        alert(4);
    }
	render(){
        let itemData = [],itemContent,footer;
        itemData.push({
            id: Date.now(),
            href: "#",
            imgSrc: "./i/holiday/img3.jpg",
            h3Text: "新西兰 南岛4日美食精华游（每周二出发）+海洋公园餐券",
            startCity: "深圳、北京",
            startDate: "天天出发",
            price: "762310",
            oldPrice: "1100",
        });

        if(itemData.length !== 0){
            itemContent =   <section className="mg-productlist">
                                <div className="mg-productlist-b">
                                    <ul className="mg-productlist-list2">
                                        {
                                            itemData.map(function(item,index){
                                                return <ListItem key={index} {...item}  />
                                            })
                                        }
                                    </ul>
                                </div>
                            </section>;
            
        }else{
            itemContent = <section className="mg-productlist">
                                <div className="mg-productlist-b">
                                    <ul className="mg-productlist-list2">
                                        暂无数据
                                    </ul>
                                </div>
                            </section>;
        }

        footer = <nav className="mg-nav">
                    <a className="mg-nav-item" href="javascript:;" onClick={this.filterClick} >
                        <em className="mg-bgs mg-ico-filter1"></em>
                        <span className="mg-nav-label">目的地</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.priceClick} >
                        <em className="mg-bgs mg-ico-filter2"></em>
                        <span className="mg-nav-label">价格区间</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.sortClick} >
                        <em className="mg-bgs mg-ico-filter3"></em>
                        <span className="mg-nav-label">综合排序</span>
                    </a>
                    <a className="mg-nav-item" href="javascript:;" onClick={this.selectClick}>
                        <em className="mg-bgs mg-ico-filter4"></em>
                        <span className="mg-nav-label">筛选</span>
                    </a>
                </nav>;
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
                            {itemContent}
                            {footer}
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
        LOGINSTATE:state.RDcount.get('LOGINSTATE')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(LIST);
