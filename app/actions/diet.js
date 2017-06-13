/**
 * Created by Administrator on 2016/8/19.
 */
'use strict';
import * as types from '../constants/ActionTypes';
import request from '../net/MyRequest';
import * as urls from '../constants/urls';

export function fetchDiet(date){
    return async dipatch=>{
        dipatch(fetchDietData());
        var res1 = await request(urls.SOL_DATE_RANGE);
        var today = res1.data.find((item)=> {return "今天" == item.label;}).date;
        date = date || today;
        var res2 = await request(urls.SOL_DIET_LIST,{
            body:{
                date
            }
        });
        dipatch(receiveDietData(res2.data, res1.data, today, date));
    }
}

export function execDiet(date, id){
    return async dispatch=>{
        var res = await request(urls.SOL_DIET_EXEC,{
            body:{
                type:types.SolTypes.Diet,
                id,
                date
            }
        });
        if(res.status === 1){
            var res2 = await request(urls.SOL_DIET_LIST,{
                body:{
                    date
                }
            });
            dispatch(execDietData(res2.data));
        }
    }
}

export function fetchMaskFood(food){
    return dispatch=>{
        dispatch(fetchMaskFoodData(food));
    }
}

function fetchDietData(){
    return {
        type:types.Diet.fetch,
        loading:true
    }
}

function receiveDietData(dietData, dateRange, today, date){
    return {
        type:types.Diet.receive,
        loading:false,
        dietData,
        dateRange,
        today,
        date
    }
}

function execDietData(dietData){
    return {
        type:types.Diet.exec,
        executed:true,
        dietData
    }
}

function fetchMaskFoodData(food){
    return {
        type:types.Diet.fetchMaskFood,
        maskFood:food
    }
}