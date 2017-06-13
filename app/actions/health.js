/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';
import * as URLS from '../constants/urls';
import request from '../net/MyRequest';
import * as types from '../constants/ActionTypes';
const HEALTH_SOL_IMG=require("../images/health/health_sleep.png");

export function fetchHealth(){
    return dispatch=>{
        dispatch(fetchHealthData());
        var req1 = request(URLS.MAIN_PAGE_ADS);
        var req2 = request(URLS.MAIN_PAGE_SOL_SUMMARY);
        Promise.all([req1,req2]).then(([res1,res2])=>{
            var adsData = res1.data.map((val,index)=>val.pic);
            console.log(JSON.stringify(res2));
            var solData=[];
            solData.push({type:types.SolTypes.Diet,title:'饮食',img:null,txt:res2.data.dietName+":"+res2.data.foodNames.join(","),totalSteps:res2.data.dietTotalSteps, executedSteps:res2.data.dietExecutedSteps});
            solData.push({type:types.SolTypes.Sport,title:'运动',img:null,txt:"今日运动:"+res2.data.sportName+",运动时长:"+res2.data.sportSpent,totalSteps:res2.data.sportTotalSteps, executedSteps:res2.data.sportExecutedSteps});
            solData.push({type:types.SolTypes.Sleep,title:'懒猫睡眠',img:HEALTH_SOL_IMG,txt:res2.data.sleepTip,totalSteps:res2.data.sleepTotalSteps, executedSteps:res2.data.sleepExecutedSteps});
            dispatch(receiveHealthData(adsData, {solData,day:res2.data.day,solId:res2.data.solId,assessId:res2.assessId}));
        });
    }
}

function fetchHealthData(){
    return {
        type : types.Health.fetch,
        loading : true
    }
}

function receiveHealthData(adsData, summary){
    return {
        type : types.Health.receive,
        loading : false,
        adsData,
        summary
    }
}