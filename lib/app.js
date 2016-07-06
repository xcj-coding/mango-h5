import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {Router,Route,Link,IndexRoute,Redirect } from 'react-router';

import {reducer} from './reducers/reducer';

import CRUISE from './cruise/index';
import NotFound from './common/notFound';

const history = useBasename(createHistory)({
	basename: '/',
	queryKey: true
});

let store = createStore(reducer);
  	
render(
	<Provider store={store}>
	<Router History={history}>
		<Redirect from="/" to="/cruise" />
		<Route path="cruise" component={CRUISE} name="游轮">
			<Route path="/cruise" component={CRUISE} />
		</Route>
		<Route path="*" component={NotFound}/>
	</Router>
	</Provider>,
	document.getElementById('app')
)

