import React,{Component} from 'react';
import {Link} from 'react-router';
import {Tips} from '../common/base';


//图片
export class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 0 };  //imageStatus等于0是加载未完成或者失败；等于1是加载完成
  }
  handleImageLoaded() {
    this.setState({ imageStatus: '1' });
  }
 
  handleImageErrored() {
    this.setState({ imageStatus: '0' });
  }
  render(){
    return (
		<span className="mg-img">
			<img
				style={this.state.imageStatus==1 ? {opacity:1} : {opacity:0} }
			  	src={this.props.imageUrl}
			  	onLoad={this.handleImageLoaded.bind(this)}
			  	onError={this.handleImageErrored.bind(this)}
			/>
			{this.state.imageStatus==0 ? <em className="mg-img-default"></em> : ""}
		</span>
    );
  }
}


// loading状态 markBlack=true为黑色遮罩
export class LoadingTip extends Component {
	constructor(props){
		super(props);
		this.state=this.props;
	}
	render(){
		return (
			<div>
				<div className={this.state.markBlack?"mg-mark-black":"mg-mark"}></div>
				<div className="mg-loading"><img src="../i/loading.gif" /></div>
			</div>
		)
	}
}


/**
 * 页头
 * headerTitle页头标题
 * gotoBack是否显示返回
 * headerArea是否显示当前城市
 * headerShare是否显示分享
 * headerCollect是否显示收藏
 * headerHome是否显示返回首页
 */
export class MgHeader extends Component {
	componentDidMount (){
		$('.mg-header-btn').on('tap','.mg-ico-collect',function(){
			console.log(document.location.hash);
		});
	}
	//encodeURIComponent把中文特殊字符转码;decodeURIComponent解码
	handleKeyDown (e){
		if(e.keyCode==13){
			let dstCity=$.trim(e.target.value);
			if(!dstCity){
				Tips({message:"请输入目的地或关键字"}); 
				return false;
			}
			dstCity=encodeURIComponent(dstCity);
			window.location="#/holiday/list/?keyword="+dstCity;

		};
	}
	render(){
		return (
			<header className="mg-header">
				{
					this.props.data.gotoBack ? <a className="mg-header-close" href="javascript:history.back(-1);"><em className="mg-ico-sjl"></em></a> : ''
				}
				{
					this.props.data.headerTitle ? <h1>{this.props.data.headerTitle}</h1> : (
						<div className="mg-header-search">
							<strong>跟团游</strong>
							<input type="text" placeholder="目的地或关键字" onKeyDown={this.handleKeyDown} />
						</div>
					) 
				}
			    <div className="mg-header-r">
			    	{
			    		this.props.data.headerArea ? <a className="mg-header-area" href="javascript:;"><span>{this.props.data.getLocation}</span><em className="mg-ico-sjb"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerShare ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-share"></em></a>  : ''
			    	}
			    	{
			    		this.props.data.headerCollect ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-collect"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerHome ? <a className="mg-bgs mg-ico-home" href="http://mt.mangocity.com"></a> : ''
			    	}
			    </div>
			</header>
		)
	}
}


/**
* 底部价格信息
* Reserve 是否显示立即预定及电话咨询
* PriceDetails 费用明细
* PriceDetailBox 费用明细显隐开关 
* Price 是否显示价格及确认产品
* orderPrice 总价
*/
export class NavBottom extends Component {
	constructor(props){
		super(props);
		this.state=Object.assign({},this.props,{
			PriceDetailBox:false
		});
	}
	PriceDetailsShow(mode){

		if(mode=="show" && !this.state.PriceDetailBox){
			this.setState({
				PriceDetailBox:true
			})
		}else{
			this.setState({
				PriceDetailBox:false
			})
		}
		
	}
	render(){
		let priceDetailBtn = this.state.PriceDetails ? <a className="mg-detail-btn" href="javascript:;" onClick={this.PriceDetailsShow.bind(this,"show")}>费用明细</a> : "";
		return(
			<div>
				{
					this.state.Reserve ? 
					(
						<aside className="mg-buy-bottom mg-g">
							<a className="mg-buy-bottom-l mg-col mg-col-3" href="tel:4006640066"><em className="mg-bgs mg-ico-tel"></em>电话咨询</a>
							<Link to={'holiday/date/' + this.props.productId} className="mg-buy-bottom-r mg-col mg-col-3">立即预定</Link>
						</aside>
					)
					 : ""
				}
				{
	            	this.state.Price ? 
	            	(
	            		<aside className="mg-buy-bottom mg-g mg-tal">
		            		<div className="mg-buy-bottom-l mg-col mg-col-3"><span>总额</span><sub>¥</sub><strong>{this.props.orderPrice || 0}</strong>{priceDetailBtn}</div>
							<div className="mg-buy-bottom-r mg-col mg-col-3" onClick={this.state.nextStep.bind(this)} >
								{
									this.props.nextStepObj ?
									<Link to="/holiday/reserve/" state={this.props.nextStepObj}><strong>下一步</strong><span>确认产品</span></Link>
									:
									<span><strong>下一步</strong><span>{this.state.nextStepTitle}</span></span>
								}
							</div>
						</aside>
	            	)
	            	:
	            	""
	            }
	            {
            		this.state.PriceDetails && this.state.PriceDetailBox ?
            		<div>
            			<div className="mg-mark-black mg-fadeIn" onClick={this.PriceDetailsShow.bind(this,"hide")}></div>
						<section className="mg-detail-msg mg-detail-fadeInDown">
							<h2>费用明细</h2>
							<h3>基本团费</h3>
							<ul>
								<li className="cf"><strong>成人</strong><span>￥{this.state.PriceDetails.adultPrice || 0}</span><span>x{this.state.PriceDetails.adultNum || 0}人</span></li>
								<li className="cf"><strong>儿童</strong><span>￥{this.state.PriceDetails.childPrice || 0}</span><span>x{this.state.PriceDetails.childNum || 0}人</span></li>
								{
									this.state.PriceDetails.tourprice ?
									<li className="cf"><strong>房差价</strong><span>￥{this.state.PriceDetails.tourprice}</span></li>
									:
									""
								}
								
							</ul>
							{
								this.state.PriceDetails.tourprice ?
								<p>注：每间房的入住人数低于标准入住人数，你需要支付单房差价</p>
								:
								""
							}
							
						</section>
					</div>
					:
					""
		        }
			</div>
		);
	}
}


// 列表内容
export class ListItem extends Component {
	render(){
		return (
			<ul className="mg-productlist-list2">
				{
					this.props.areaList.map(function(dataChild, indexChild) {
						return 	<li key={indexChild}>
									<a className="cf" href={"#/holiday/details/"+dataChild.productId.replace(/p2$/,"")}>
										<ImageBox imageUrl={dataChild.productImageUrl} />
										<div className="mg-productlist-r1">
											<h3>
												{dataChild.productCaption}
												{
													dataChild.productSalePoint ? 
													(<span> -- <em>{dataChild.productSalePoint}</em></span>) 
													: ""
												}
											</h3>
											<div className="mg-productlist-explain">
												<p className="cf"><span className="fl">出发城市 : </span><span className="mg-ellipsis">{dataChild.productStarting ? dataChild.productStarting : dataChild.orgCity}</span></p>
												<p className="cf"><span className="fl">出发日期：</span><span className="mg-ellipsis">{dataChild.productDepartDate}</span></p>
											</div>
											<div className="mg-productlist-price">
												{dataChild.productPrice ? <strong><sub>￥</sub><em>{dataChild.productPrice}</em> 起</strong> : ""}
												{dataChild.productOrignalPrice ? <del>原价：￥{dataChild.productOrignalPrice}</del> : ""}
											</div>
										</div>
									</a>
								</li>;

					})
				}
				{
					(this.props.totalPage > 1 && this.props.pageNumber < this.props.totalPage) ?
					<a className="morePage" ref="morePage" onClick={this.props.pageFn}>点我，还有更多产品！</a> :
					""
				}
			</ul>
		)
	}
}


// 暂无内容
export class NoContent extends Component {
	render(){
		return (
			<aside className="mg-prompt-warp">
				<div className="mg-prompt-box">
					<em className="mg-prompt-ico"></em>
					<h3>{this.props.title}</h3>
					<h4>{this.props.content}</h4>
				</div>
			</aside>
		)
	}
}


// tab切换
export class Tab extends Component {
	constructor(props){
		super(props);
		this.state={
		    currentIndex : 0
		};
	}
	check_tittle_index(index){
	    return index === this.state.currentIndex ? "mg-col selected" : "mg-col";
	}
	check_item_index(index){
	    return index === this.state.currentIndex ? "mg-fadeInRight selectedShow" : "mg-fadeInRight";
	}
	render(){
		return(
			<div className="mg-details">
			    <ul className="mg-g">
			        {React.Children.map(this.props.children,(element,index)=>{
			            return(
			            	<li onClick={()=>{this.setState({currentIndex : index})}} className={this.check_tittle_index(index)}>
			            		<span>{element.props.name}</span>
		            		</li>
		                )
			        })}
			    </ul>
		        {React.Children.map(this.props.children,(element,index)=>{
	            	// <div className={this.check_item_index(index)}>{element}</div>
		            return(
        	            <div 
        	            	key={index} 
        	            	className={this.check_item_index(index)} 
        	            	dangerouslySetInnerHTML={{
        	            		__html : element.props.children
        	            	}} 
                    	/>
	                )
		        })}
			</div>
		);
	}
}

