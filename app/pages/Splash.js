/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    InteractionManager,
    StyleSheet,
    Dimensions
} from 'react-native';

import Login from '../pages/Login'
import MainContainer from '../containers/MainContainer'

let {height, width} = Dimensions.get("window");

export default class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const {navigator} = this.props;
        this.timer = setTimeout(()=>{
            InteractionManager.runAfterInteractions(()=>{
                navigator.resetTo({
                    component:Login,
                    name:'Login'
                })
            });
        }, 1500);
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <Image
                style={styles.startImg}
                source={require("../images/start_bg.png")}
            />
        );
    }
}

let styles = StyleSheet.create({
    startImg:{
       flex:1,
        height:height,
        width:width
   }
});