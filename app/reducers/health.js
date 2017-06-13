/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';

import * as types from "../constants/ActionTypes";

let initialState = {
    loading : true,
    adsData : [],
    summary : {}
}

export default function health(state = initialState, action){
    switch (action.type){
        case types.Health.fetch:
            return Object.assign({}, state, {
                loading : action.loading
            });
        case types.Health.receive:
            return Object.assign({}, state, {
                loading : action.loading,
                adsData : action.adsData,
                summary : action.summary
            });
        default:
            return state;
    }
}