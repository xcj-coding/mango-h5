import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createHistory, useBasename} from 'history';
import {Router,Route,Link,IndexRoute,Redirect } from 'react-router';

import Reducers from './reducers/index';

import CRUISE from './cruise/index';
import HOLIDAY from './holiday/index';

import NotFound from './common/notFound';


const history = useBasename(createHistory)({
	basename: '/',
	queryKey: true
});


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(Reducers);
console.log(store.getState())
store.subscribe(() =>
	console.log(store.getState())
);
store.dispatch({ type: 'FAILURE'});
render(
	<Provider store={store}>
		<Router History={history}>
			<Route path="">
				<Redirect from="/" to="cruise" />
				<Route path="cruise">
					<IndexRoute component={CRUISE.HOME} name="游轮首页"/>
					<Route path="list" component={CRUISE.LIST} name="游轮列表"/>
				</Route>
				<Route path="holiday">
					<IndexRoute component={HOLIDAY.HOME} name="跟团游首页"/>
					<Route path="list" component={HOLIDAY.LIST} name="跟团游列表"/>
				</Route>
				<Route path="b" component={CRUISE.LIST} name="test">
				</Route>
			</Route>
			<Route path="*" component={NotFound}/>
		</Router>
	</Provider>,
	document.getElementById('app')
)

