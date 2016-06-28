console.log('t3.js')
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom} from './common';


class T3 extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		return (
			<div>
				<h1>33333333</h1>
        		<NavBottom />
			</div>
		)
	}
}

export default T3;
