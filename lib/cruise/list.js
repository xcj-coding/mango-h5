import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';


class LISTinfo extends Component{
	componentWillMount(){
	}
	render(){
		return (
		      <p>
		        Hello, <input type="text" placeholder="Your name here" />!
		      </p>
		    );
	}
}

class LIST extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props;
	}
	componentWillMount(){
		this.setState({LOADINGTIP:true},function(){
			console.log(this.props);
			console.log(this.state);
		});
	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div>
				<LISTinfo />
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
