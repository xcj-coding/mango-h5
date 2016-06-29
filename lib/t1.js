console.log('t1.js')
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom} from './common';


class T1 extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		return (
			<div>
				<h1>1111111大大</h1>
        		<NavBottom />
			</div>
		)
	}
}

export default T1;
