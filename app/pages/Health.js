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
    ART,
    TouchableHighlight,
    Navigator
} from 'react-native';
const {Surface, Shape, Path} = ART;
import ViewPager from 'react-native-viewpager';

import {fetchHealth} from '../actions/health';

import * as types from '../constants/ActionTypes';

import DietContainer from '../containers/DietContainer';
import SportContainer from '../containers/SportContainer';
import SleepContainer from '../containers/SleepContainer';

const HEALTH_TOP_IMG=require("../images/health/health_top.png");
const HEALTH_SOL_IMG=require("../images/health/health_sleep.png");
const HEALTH_DETAIL=require("../images/health/find_next.png");

let radius = 30, imgWidth = radius *2, imgHeight = radius * 2;
export default class Health extends Component {

    constructor(props) {
        super(props);

        this._renderHeader = this._renderHeader.bind(this);
        this._renderRow = this._renderRow.bind(this);

        var adsDataSource = new ViewPager.DataSource({
            pageHasChanged:(p1,p2)=>p1!==p2,
        });
        var solDataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });

        this.state = {
            adsData:adsDataSource,
            solData:solDataSource,
        }
    }

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(fetchHealth());
    }

    _renderHeader(){
        return (
          <View>
              <ViewPager
                style={{height:130}}
                dataSource={this.state.adsData}
                renderPage={this._renderPage}
                isLoop={true}
                autoPlay={true} />
              <View style={{flexDirection:'row'}}>
                  <Image source={HEALTH_TOP_IMG}></Image>
                  <View><Text>计划第2天</Text></View>
                  <View><Text>建议坚持不少于7天</Text></View>
              </View>
          </View>
        );
    }

    _renderPage(data, pageId){
        return (
            <Image source={{uri:data}} style={styles.page}></Image>
        );
    }

    _renderRow(rowData,secId,rowId,highlightRow){

        let execCircle = (<View></View>);
        if(rowData.executedSteps > 0) {
            let path = new Path()
                .moveTo(radius,-2*radius*(1-rowData.executedSteps/rowData.totalSteps))
                .arc(0,2*radius,radius).close();
            let viewY = 2*radius*(1-rowData.executedSteps/rowData.totalSteps);
            execCircle = (
                <View style={{position:'absolute',bottom:1,paddingTop:viewY}}>
                    <Surface width={imgWidth} height={imgHeight-viewY}>
                        <Shape d={path} stroke="#BCEE68" fill="#BCEE68" strokeWidth={1}/>
                    </Surface>
                </View>
            );
        }
        let component={[types.SolTypes.Diet]:{component:DietContainer,name:"Diet"},
            [types.SolTypes.Sport]:{component:SportContainer,name:"Sport"},
            [types.SolTypes.Sleep]:{component:SleepContainer,name:"Sleep"}}
        return (
            <TouchableHighlight onPress={()=>{
                    this.props.navigator.push(component[rowData.type]);
                }}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.cellFixedLeft}>{rowData.img?
                        <Image source={rowData.img} style={styles.listImg} />:
                        <View style={styles.listImgRadio}>
                            {execCircle}
                            <Text style={{alignSelf:'center'}}>{rowData.title}</Text>
                        </View>}
                    </View>
                    <View style={styles.cell}><Text>{rowData.txt}</Text></View>
                    <View style={styles.cellFixedRight}><Image source={HEALTH_DETAIL}></Image></View>
                </View>
            </TouchableHighlight>
        );
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
        const {health, navigator} = this.props;
        console.log("------------------------------------------------");
        if(health.loading){
            return(<View><Text>加载中...</Text></View>);
        }

        return (
            <View>
                <View style={styles.healthHeader}><Text style={styles.healthHeaderTxt}>健康</Text></View>

                <ListView style={{flex:1,backgroundColor:'white'}}
                          enableEmptySections = {true}
                          dataSource={this.state.solData.cloneWithRows(health.summary.solData)}
                          renderRow={this._renderRow}
                          renderSeparator={this._renderSepratator}
                          renderHeader = {()=>{
                              return (
                                  <View>
                                      <ViewPager
                                        style={{height:130}}
                                        dataSource={this.state.adsData.cloneWithPages(health.adsData)}
                                        renderPage={this._renderPage}
                                        isLoop={true}
                                        autoPlay={true} />
                                      <View style={{flexDirection:'row',alignSelf:'center'}}>
                                          <View style={{margin:10}}><Image style={styles.topImg} source={HEALTH_TOP_IMG}></Image></View>
                                          <View style={{margin:10}}><Text style={{alignSelf:'center'}}>计划第<Text style={{color: 'red'}}>{health.summary.day}</Text>天</Text><Text>建议坚持不少于7天</Text></View>
                                      </View>
                                  </View>
                                );
                          }}>
                    </ListView>
            </View>
        );
    }
}
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
    listImg:{
        width:60,
        height:60*136/143
    },
    listImgRadio:{
        flexDirection:'column',
        backgroundColor: 'white',
        borderRadius:radius,
        borderWidth:1,
        borderColor:'#BCEE68',
        borderStyle:'solid',
        width: imgWidth,
        height: imgHeight,
        justifyContent:'center',
        overflow:'visible',
    },
    // listImgRadioHalf:{
    //     position:'absolute',
    //     bottom:1,
    //     backgroundColor: '#BCEE68',
    //     borderWidth:1,
    //     borderColor:'#BCEE68',
    //     borderStyle:'solid',
    //     width: 60,
    //     height: 30,
    //     borderBottomLeftRadius:30,
    //     borderBottomRightRadius:30,
    // },
    listImgRadioHalf:{
        backgroundColor: 'transparent',
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        width: 0,
        height: 0,
        borderTopColor: '#BCEE68',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderStyle:'solid',
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
        height:80,
        margin:10,
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    cellFixedLeft:{
        height:80,
        margin:10,
        width:60,
        justifyContent: 'center',
        alignItems:'center'
    },
    cellFixedRight:{
        height:80,
        margin:10,
        width:40,
        justifyContent: 'center',
        alignItems:'flex-end'
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
    }
});