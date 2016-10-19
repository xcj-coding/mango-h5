import {combineReducers } from 'redux';
import RDcount from './reducer';
import Holiday from './holiday';

const Reducers = combineReducers({RDcount,Holiday});
export default Reducers;