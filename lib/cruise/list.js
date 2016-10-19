import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {ADDRESS} from '../common/address';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';


class LISTinfo extends Component{
	constructor(props) {
		super(props);

		this.state = {
			loadAddress:false,
			showAddress:false,
			selectCity:''
		};
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	show(){
		this.setState({loadAddress:true});
		this.setState({showAddress:true});
	}
	handleSelectClass(event){
		this.setState({showAddress:false});
	}
	selectCityFn(data){
		this.setState({selectCity:data});
	}
	render(){
		return (
			<div>
				<div style={{"height":"100px"}}></div>
				<button onClick={this.show.bind(this)}>{this.state.selectCity?this.state.selectCity:'默认值'}</button>
				{
					this.state.loadAddress ? <ADDRESS handleSelectClass={this.handleSelectClass.bind(this)} selectCityFn={this.selectCityFn.bind(this)} showAddress={this.state.showAddress} ></ADDRESS> : '' 
				}
			</div>
		);
	}
}

class LIST extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
	}
	componentWillMount(){
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div>
				<LISTinfo />
				<p>dddddddddddddd</p>
				<p>dddddddddddddd</p>
				<p>dddddddddddddd</p>
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
