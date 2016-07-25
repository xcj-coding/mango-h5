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
	render(){
		return (
			<div>
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
                            <section className="mg-productlist">
                                <div className="mg-productlist-b">
                                    <ul className="mg-productlist-list2">
                                        <ListItem />
                                    </ul>
                                </div>
                            </section>
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
