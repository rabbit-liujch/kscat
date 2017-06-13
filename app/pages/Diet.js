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

export default class Diet extends Component {

    constructor(props) {
        super(props);

        this._foodDialogs = [];

        this._renderRow = this._renderRow.bind(this);
        this._renderPage = this._renderPage.bind(this);

        var dietDataSource = new ViewPager.DataSource({
            pageHasChanged:(p1,p2)=>p1!==p2,
        });

        var listDataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });

        this.state = {
            dietData:dietDataSource,
            solData:listDataSource,
        }
    }

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(fetchDiet());
    }

    _exec(id){
        const {diet,dispatch} = this.props;
        dispatch(execDiet(diet.date, id));
        dispatch(fetchHealth());
    }

    _renderPage(data, pageId){
        const {diet} = this.props;
        var icon = (data.done == 0 ? PLAN_UNDO_IMG : PLAN_DONE_IMG);
        var txt = (data.done == 0 ? "未完成" : "已完成");
        var indicators = diet.dietData.map((val,index)=>{
           if(val.id == data.id){
                return (<View key={index} style={styles.curDot}></View>);
           } else {
               return <View key={index} style={styles.dot}></View>;
           }
        });
        var execIcon = diet.today == diet.date ? (
            <View style={{flexDirection:'column',marginRight:6}}>
                <View><ImageButton source={icon} imgStyle={{width:24,height:24}} onPress={()=>this._exec(data.id)} /></View>
                <View><Text style={{fontSize:8}}>{txt}</Text></View>
            </View>
        ) : (
            <View style={{flexDirection:'column',marginRight:6}}>
            </View>
        );
        return (
            <View style={{width:width}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                    <View></View>
                    <View style={{flexDirection:'column',alignItems:'center'}}>
                        <View><Text>{data.name}({data.startTime}-{data.endTime})</Text></View>
                        <View style={{flexDirection:'row'}}>
                            {indicators}
                        </View>
                    </View>
                    {execIcon}
                </View>
                <ListView style={{backgroundColor:'white'}}
                    dataSource={this.state.solData.cloneWithRows(data.food)}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSepratator}>
                </ListView>
            </View>
        );
    }

    _renderRow(rowData,secId,rowId,highlightRow){
        return (
            <TouchableHighlight onPress={()=>{
                    this._openMaskFood(rowData);
                }}>
                <View style={[styles.cell]}>
                    <Image source={{uri:rowData.bigPic}} style={{height: 480/600*334, width: 480,resizeMode: Image.resizeMode.contain}}/>
                    <View style={{position:'absolute',top:10,left:10,margin:3,padding:3,backgroundColor:'#e0ffff33'}}><Text>{rowData.name}</Text></View>
                </View>

            </TouchableHighlight>
        );
    }

    _openMaskFood(food){
        const {navigator, dispatch} = this.props;
        // navigator.push({
        //     component:MaskFood,
        //     name:"MaskFood"
        // });
        dispatch(fetchMaskFood(food))
        this._foodDialogs.show();
    }

    _renderSepratator(secId,rowId,rowHignlight){
        return (
            <View key={`${secId}-${rowId}`}
                style={{
                    height:rowHignlight?2:1,
                    backgroundColor:rowHignlight?'#E0FFFF' : '#CCCCCC',
                }}>
            </View>
        );
    }

    render() {
        const {diet, navigator, dispatch} = this.props;
        if(diet.loading){
            return(<View><Text>加载中...</Text></View>);
        }

        var maskFoodView = (<View />);
        if(!fp.isEmpty(diet.maskFood)){
            let list = fp.map(diet.maskFood.mainIngr,(item, index)=>{
                return (
                    <View style={{flexDirection:"row", backgroundColor:index%2===1?"white":"#E8E8E8"}}>
                        <View><Text>item.name</Text></View>
                        <View><Text>item.size</Text></View>
                    </View>
                )
            });
            let children = [];

            for (var i = 0; i < diet.maskFood.mainIngr.length; i++) {
                children.push(
                    <View key={i} style={{flexDirection:"row", backgroundColor:i%2===1?"white":"#E8E8E8"}}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text>{diet.maskFood.mainIngr[i].name}</Text></View>
                        <View style={{backgroundColor:"#CFCFCF",width:1}}></View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><Text>{diet.maskFood.mainIngr[i].size}g</Text></View>
                    </View>);
            }
            maskFoodView = (
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"flex-start",width:width,overflow:"visible",alignItems:"center"}}>
                        <View style={{marginLeft:20,marginRight:10,top:-10,overflow:"visible",alignItems:"center",justifyContent:"center"}}>
                            <Image source={{uri:diet.maskFood.bigPic}} style={{height: 120/600*334, width: 120,resizeMode: Image.resizeMode.contain}}></Image>
                        </View>
                        <View><Text>{diet.maskFood.name}</Text></View>
                        <View></View>
                    </View>
                    <View style={{backgroundColor:"#E8E8E8",height:1,marginTop:3,marginBottom:3}}></View>
                    <View style={{alignItems:"center"}}><Text>主材</Text></View>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                        style={{flex:1}}>
                        <View style={{flexDirection:"column",width:width}}>
                            {children}
                        </View>
                    </ScrollView>
                </View>
            );
        }

        return (
            <View>
                <View style={styles.healthHeader}>
                    <DatePicker
                        style={{width: 200}}
                        date={diet.date}
                        mode="date"
                        format="YYYY-MM-DD"
                        minDate={diet.dateRange[0].date}
                        maxDate={diet.dateRange.reverse()[0].date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={(date) => {dispatch(fetchDiet(date));}}
                    />
                </View>

                <View>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dietData.cloneWithPages(diet.dietData)}
                        renderPage={this._renderPage}
                        isLoop={false}
                        autoPlay={false}
                        renderPageIndicator={false}
                    />
                </View>
                
                <Dialog ref={(r)=>this._foodDialogs = r}>
                    {maskFoodView}
                </Dialog>
                <SolWindow type="1" {...this.props} />
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