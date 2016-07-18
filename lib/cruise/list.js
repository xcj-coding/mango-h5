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
		    LOADINGTIP:false,
		    hovering:false
		};
	}
	componentWillMount(){
		this.setState({LOADINGTIP:true},function(){
			console.log(this.props);
			console.log(this.state);
		});
	}
	componentDidMount(){
		$(".mg-tjcp-img").show();
		let swiperTjcp = new Swiper('.mg-tjcp-warp',{
			wrapperClass : 'mg-tjcp-bx',
			slideClass : 'mg-tjcp-img',
			pagination : '.mg-swiper-ico',
			bulletActiveClass : 'mg-swiper-active',
			loop: true,
			autoplay: 8000
		})
	}
	render(){
		var animationProps;
		if(this.state.hovering) {
			animationProps = {
				duration: 200,
				animation: {
					rotateX: 160
				}
			};
		}else{
			animationProps = {
				duration: 1100,
				animation: {
					rotateX: [0, 'spring']
				}
			};
		}
		return (
			<div>
				dddddddddddddddddddddddddddddd
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
