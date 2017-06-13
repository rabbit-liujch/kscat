/**
 * Created by Administrator on 2016/8/24.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Platform,
    ListView,
    View,
    TouchableHighlight,
    Navigator,
    Animated,
    Easing,
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

export default class DietMaskFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity:new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Animated.View style={[styles.mask,{opacity:this.state.opacity}]}></Animated.View>
            </View>
        );
    }

    componentDidMount(){
        Animated.timing(
            this.state.opacity,
            {
                easing: Easing.linear,
                duration: 500,
                toValue: 0.8,
            }
        ).start();
    }
}

let styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
        opacity:0.6,
    },
    mask:{
       justifyContent:"center",
       backgroundColor:"#383838",
       opacity:0.6,
       position:"absolute",
       width:width,
       height:height,
       left:left,
       top:top,
   }
});