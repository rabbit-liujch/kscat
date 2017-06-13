/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import reducers from '../reducers/index';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

export default function configureStore(initState) {
    return createStoreWithMiddleware(reducers, initState);
}