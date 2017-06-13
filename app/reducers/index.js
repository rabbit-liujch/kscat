/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import {combineReducers} from 'redux';
import diet from './diet';
import health from './health';

const reducers = combineReducers({
    diet,
    health
});

export default reducers;