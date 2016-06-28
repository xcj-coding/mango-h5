import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {Router,Route,Link,IndexRoute,Redirect,browserHistory } from 'react-router';

import {reducer} from './reducer';
import Index from './index';
import T1 from './news/index';
import T2 from './t2';
import T3 from './t3';
import NotFound from './notFound'

const history = useBasename(createHistory)({
	basename: '/',
	queryKey: true
});

console.log(1);

let store = createStore(reducer);
  	
render(
  <Provider store={store}>
	<Router History={history}>
		<Route path="index" component={Index} name="首页">
			<Redirect from="/" to="/index" />
			<Route path="/index" component={Index} />
		</Route>
		<Route path="t1" component={T1} name="政策资讯">
		</Route>
		<Route path="t2" component={T2} name="查询评测">
		</Route>
		<Route path="t3" component={T3} name="我的地盘">
		</Route>
		<Route path="*" component={NotFound}/>
	</Router>
  </Provider>,
  document.getElementById('app')
)

