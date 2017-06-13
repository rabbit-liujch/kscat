/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Navigator,
    StyleSheet,
    BackAndroid
} from 'react-native';
import Splash from '../pages/Splash';

var listening = false;
export default class App extends Component {
    constructor(props){
        super(props);
        this._configureScene = this._configureScene.bind(this);
        this._renderScene = this._renderScene.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    style={styles.nav}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                    initialRoute={{
                        component:Splash,
                        name:'Splash'
                    }}
                />
            </View>
        );
    }

    _back(nav){
        if(nav&&nav.getCurrentRoutes().length > 1){
            nav.pop();
            return true;
        }
        return false;
    }

    _configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _renderScene(route, nav){
        let Component = route.component;
        if(!listening) {
            BackAndroid.addEventListener("hardwareBackPress", ()=>this._back(nav));
            listening = true;
        }
        return (
            <Component navigator={nav} route={route} />
        );
    }
}

let styles = StyleSheet.create({
   container:{
       flex:1
   },
    nav:{
        flex:1
    }
});
