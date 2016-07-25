import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class HOME extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props;
	}
	componentWillMount(){

	}
	componentDidMount(){
		this.setState({LOADINGTIP:false})
	}
	render(){
		return (
			<div>
				{
					this.state.LOADINGTIP ? (
						<LoadingTip />
					) : (
						<div>
							<MgHeader data={{
								headerTitle:"跟团游",
								gotoBack:true,
								headerArea:false,
								headerShare:false,
								headerCollect:false,
								headerHome:false,
							}} />
							homehomehomehomehome
							<Link to = "cruise">邮轮</Link>
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
