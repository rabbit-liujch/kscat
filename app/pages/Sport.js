/**
 * Created by Administrator on 2016/7/2.
 */

'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Platform,
    ListView,
    View,
    TouchableHighlight,
    Dimensions,
    Animated,
    ScrollView,
    Easing,
    Navigator
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import DatePicker from 'react-native-datepicker';
import ImageButton from '../components/ImageButton';

import Dialog from '../components/Dialog';
import SolWindow from '../components/SolWindow';

import {fetchDiet, execDiet,fetchMaskFood} from '../actions/diet';

import {fetchHealth} from '../actions/health';

import fp from 'lodash/fp';

const PLAN_DONE_IMG=require("../images/diet/plan_has_do.png");
const PLAN_UNDO_IMG=require("../images/diet/plan_not_do.png");

var {height, width} = Dimensions.get('window');

export default class Sport extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <Text>运动</Text>
                <SolWindow type="2" {...this.props} />
            </View>
        );
    }
}

let DOT_SIZE = 6;
let DOT_SAPCE = 4;
let styles = StyleSheet.create({
    page: {
        flex: 1,
        height: 130,
        resizeMode: 'stretch'
    },
    topImg:{
        width:48,
        height:48*84/105
    },

    container: {
        flex: 1,
        height:100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    marqueeLabel: {
        backgroundColor: '#FFFFE0',
        width:200,
        height:140
    },

    listImg:{
        width:60,
        height:60*136/143
    },
    listImgRadio:{
        flexDirection:'column',
        backgroundColor: 'white',
        borderRadius:30,
        borderWidth:1,
        borderColor:'#BCEE68',
        borderStyle:'solid',
        width: 60,
        height: 60,
        justifyContent:'center',
        overflow:'visible',
    },
    listImgRadioHalf:{
        position:'absolute',
        bottom:1,
        backgroundColor: '#BCEE68',
        borderWidth:1,
        borderColor:'#BCEE68',
        borderStyle:'solid',
        width: 60,
        height: 30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    detailImg:{
        width:60,
        height:60*136/143
    },
    healthHeader:{
        height:30,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'green',
    },
    healthHeaderTxt:{
        fontSize:16,
        color:"white"
    },
    cell:{
        flex:1,
        height:160,
        margin:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
    recommendTitle: {
        width: 160,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        height: 30
    },
    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#E0E1E2',
        marginLeft: DOT_SAPCE,
        marginRight: DOT_SAPCE,
    },
    curDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#80ACD0',
        marginLeft: DOT_SAPCE,
        marginRight: DOT_SAPCE,
    },
    mask:{
        justifyContent:"center",
        backgroundColor:"#383838",
        opacity:0.6,
        position:"absolute",
        width:width,
        height:height,
        left:0,
        top:0,
    }
});