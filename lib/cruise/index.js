console.log("游轮");
console.log("游轮");
console.log("游轮");
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavBottom} from '../common';

class CRUISE extends Component{
	constructor(props){
	  super(props)
	  document.title = props.route.name
	}
	render(){
		return (
			<div>
				<h1>游轮</h1>
        		<NavBottom />
			</div>
		)
	}
}

export default CRUISE;