import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createHistory, useBasename} from 'history';
import {Router,Route,Link,IndexRoute,Redirect } from 'react-router';

import Reducers from './reducers/index';

import CRUISE from './cruise/index';
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
			<Redirect from="/" to="/cruise" />
			<Route path="cruise" component={CRUISE} name="游轮">
				<Route path="/cruise" component={CRUISE} />
			</Route>
			<Route path="*" component={NotFound}/>
		</Router>
	</Provider>,
	document.getElementById('app')
)

