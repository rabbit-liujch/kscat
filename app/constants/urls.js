/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';
const JKGL_API_BASE_URL = "http://58.213.69.194:8083/jkgl/APP_API";
const JKTOOL_API_BASE_URL = "http://58.213.69.194:3080/jktool";

//主页广告
export const MAIN_PAGE_ADS = JKGL_API_BASE_URL + "/home/getAds";
//主页方案概览
export const MAIN_PAGE_SOL_SUMMARY = JKTOOL_API_BASE_URL + "/authc/user/sol/getMySolTodaySummaryInfo";
//方案日期区间
export const SOL_DATE_RANGE = JKTOOL_API_BASE_URL + "/authc/user/sol/date-range";
//饮食方案
export const SOL_DIET_LIST = JKTOOL_API_BASE_URL + "/authc/user/sol/getMySolDietsByDate";
//执行饮食方案
export const SOL_DIET_EXEC = JKTOOL_API_BASE_URL + "/authc/user/sol/execMySol";