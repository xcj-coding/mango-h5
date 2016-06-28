console.log('news')
import {connect} from 'react-redux';
import React,{Component} from 'react';
import * as CM from '../common';


class AllNews extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		return (
			<div>
				<div className="top_nav"></div>

        		<CM.NewsList />

        		<CM.NavBottom />
			</div>
		)
	}
}

export default AllNews;
