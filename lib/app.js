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
import ADDRESS from './common/address';

import NotFound from './common/notFound';


const history = useBasename(createHistory)({
	basename: '/',
	queryKey: true
});


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(Reducers);

render(
	<Provider store={store}>
		<Router History={history}>
			<Route path="">
				<Redirect from="/" to="holiday" />
				<Route path="holiday">
					<IndexRoute component={HOLIDAY.HOME} name="跟团游"/>
					<Route path="list" component={HOLIDAY.LIST} name="跟团游"/>
					<Route path="list/:id" component={HOLIDAY.LIST} name="跟团游"/>
					<Route path="details/:id" component={HOLIDAY.DETAILS} name="详情"/>
					<Route path="date" component={HOLIDAY.DATE} name="跟团游"/>
					<Route path="reserve" component={HOLIDAY.RESERVE} name="跟团游"/>
				</Route>
				<Route path="cruise">
					<IndexRoute component={CRUISE.HOME} name="邮轮"/>
					<Route path="list" component={CRUISE.LIST} name="邮轮"/>
				</Route>
				<Route path="address" component={ADDRESS} name="地理位置">
				</Route>
			</Route>
			<Route path="*" component={NotFound}/>
		</Router>
	</Provider>,
	document.getElementById('app')
)

