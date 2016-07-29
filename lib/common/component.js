import {connect} from 'react-redux';
import React,{Component} from 'react';
import {Link} from 'react-router';

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

// loading状态
export class LoadingTip extends Component {
	render(){
		return (
			<div>
				<div className="mg-mark"></div>
				<div className="mg-loading"><img src="./i/loading.gif" /></div>
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
							<input type="text" placeholder="目的地或关键字" />
						</div>
					) 
				}
			    <div className="mg-header-r">
			    	{
			    		this.props.data.headerArea ? <a className="mg-header-area" href=""><spam>深圳</spam><em className="mg-ico-sjb"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerShare ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-share"></em></a>  : ''
			    	}
			    	{
			    		this.props.data.headerCollect ? <a className="mg-header-btn" href="javascript:;"><em className="mg-bgs mg-ico-collect"></em></a> : ''
			    	}
			    	{
			    		this.props.data.headerHome ? <a className="mg-bgs mg-ico-home" href="#/holiday"></a> : ''
			    	}
			    </div>
			</header>
		)
	}
}

// 底部菜单
export class NavBottom extends Component {
	render(){
		return (
			<div data-am-widget="navbar" className="am-navbar am-cf" id="" style={{'borderTop':'1px solid #e0e0e0','backgroundColor':'#fff'}}>
			    <ul className="am-navbar-nav am-cf am-avg-sm-4">
			        <li>
			          <a href="#/cruise">
			              <span className="am-icon-user" style={{color:'#7f7f7f'}}></span>
			              <span className="am-navbar-label" style={{color:'#7f7f7f'}}>游轮</span>
			          </a>
			        </li>
			    </ul>
			</div>
		)
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
									<a className="cf" href={"#/holiday/details/"+dataChild.productId}>
										<ImageBox imageUrl={dataChild.productImageUrl} />
										<div className="mg-productlist-r1">
											<h3>{dataChild.productCaption}</h3>
											<p className="mg-productlist-explain">出发城市 : {dataChild.productStarting}<br/>出发日期：{dataChild.productDepartDate}</p>
											<div className="mg-productlist-price">
												<strong><sub>￥</sub><em>{dataChild.productPrice}</em> 起</strong>
												<del>原价：￥{dataChild.productOrignalPrice}</del>
											</div>
										</div>
									</a>
								</li>;

					})
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
					<em className="mg-bgs mg-prompt-ico"></em>
					<h3>{this.props.title}</h3>
					<h4>{this.props.content}</h4>
				</div>
			</aside>
		)
	}
}


//选择地址

export class Address extends Component {
	render(){
		return (
			<div>xx</div>
		)
	}
}
