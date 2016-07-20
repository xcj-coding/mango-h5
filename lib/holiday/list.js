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

	}
	componentDidMount(){
		
	}
	render(){
		return (
			<div>
				<MgHeader headerTitle="跟团游" gotoBack={true} />
				listlistlistlistlist
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
