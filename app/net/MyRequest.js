/**
 * Created by Administrator on 2016/8/17.
 */
'use strict';
import {NativeModules} from 'react-native'
import storage from '../store/storage';

let METHOD = "POST";
let HEADERS = {
    'Content-Type':'application/json',
    'ua':'android'
}
export default async function request(...args){
    let loginState = await storage.load({key:"loginState"}).then(ret=>ret).catch(err=>null);
    return NativeModules.MyRequest.request(args[0], Object.assign({},{method:METHOD},
        args[1]&&args[1].body?{body:JSON.stringify(Object.assign({},args[1].body))}:{body:''},
        {headers:Object.assign({},HEADERS,args[1]&&args[1].headers||{},loginState&&args[0].indexOf("authc")>-1?{token:loginState.token}:{})}
    )).then(res=>JSON.parse(res));
}