console.log('t2.js')
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom} from './common';


class T2 extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		return (
			<div>
				<h1>2222222222</h1>
        		<NavBottom />
			</div>
		)
	}
}

export default T2;
