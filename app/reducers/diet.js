/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    loading: true,
    executed:false,
    dietData:[],
    dateRange:[]
};
export default function diet(state=initialState, action){
    switch (action.type){
        case types.Diet.fetch:
            return Object.assign({}, state, {
                loading:action.loading
            });
        case types.Diet.receive:
            return Object.assign({}, state, {
                loading:action.loading,
                dietData:action.dietData,
                dateRange:action.dateRange,
                today:action.today,
                date:action.date,
            });
        case types.Diet.exec:
            return Object.assign({}, state, {
                executed:action.executed,
                dietData:action.dietData,
            });
        case types.Diet.fetchMaskFood:
            return Object.assign({}, state, {
                maskFood:action.maskFood
            });
        default:
            return state;
    }
}