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
						<LoadingTip ttt="131" />
						<LoadingTip ttt="22" />
						<LoadingTip ttt="333" />
					) : (
						<div>
							<MgHeader headerTitle="跟团游" gotoBack={true} />
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
        LOGINSTATE:state.RDcount.get('LOGINSTATE')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(HOME);
