/**
 * Created by Administrator on 2016/8/25.
 */
'use strict';
import React, {Component} from 'react';
import  {
    StyleSheet,
    Image,
    Text,
    TextInput,
    Platform,
    ListView,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Navigator,
    Animated,
    Easing,InteractionManager,
    Dimensions
} from 'react-native';

import * as types from '../constants/ActionTypes';


import DietContainer from '../containers/DietContainer';
import SportContainer from '../containers/SportContainer';
import SleepContainer from '../containers/SleepContainer';

var {height, width} = Dimensions.get('window');
let [v_width,v_height]=[120,120];
let spend=500;
let [controlLeft,controlTop] = [90,90];
let controlRaius = 18;
let [startRadius,endRadius]=[0,22];
let [startFontSize,endFontSize]=[0,14];
let [startRotation, endRotation]=['0deg','360deg'];
export default class SolWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dietTop: new Animated.Value(0),
            dietLeft: new Animated.Value(0),
            sportTop: new Animated.Value(0),
            sportLeft: new Animated.Value(0),
            sleepTop:new Animated.Value(0),
            sleepLeft:new Animated.Value(0),
            opacity:new Animated.Value(0),
            rotation:new Animated.Value(0),
            viewRadius:new Animated.Value(0),
            viewWidth:new Animated.Value(0),
            viewHeight:new Animated.Value(0),
            fontSize:new Animated.Value(0),
            hide: false,
            expended:false,
        }
    }

    render() {
         if(this.state.hide){
            return (<View />)
        } else {
             let src = this.state.expended?require("../images/diet/plan_float_s.png"):require("../images/diet/plan_float.png");
             let backColors = ['','orange','orange','orange'];
             backColors[Number.parseInt(this.props.type)] = 'green';
            return (
                <View style={styles.container} >
                    <Animated.View style={[{transform: [{
                            rotateZ:this.state.rotation.interpolate({
                                inputRange: [0,1],
                                outputRange: [startRotation, endRotation]
                            })
                          }],

                            left: this.state.dietLeft.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlLeft+controlRaius-startRadius, controlLeft+controlRaius-endRadius]
                            }),
                            top: this.state.dietTop.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlTop+controlRaius-startRadius, 10]
                            }),
                            backgroundColor: backColors[types.SolTypes.Diet],
                            borderRadius:this.state.viewRadius.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius, endRadius]
                            }),
                            width:this.state.viewWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            height:this.state.viewHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            opacity:this.state.opacity,
                            justifyContent: 'center',
                            alignItems:'center',
                            position:"absolute",
                        }]}>
                        <TouchableHighlight onPress={()=>{this._switchSolWindow(1);}}>
                            <Animated.Text style={[{
                                fontSize:this.state.fontSize.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [startFontSize, endFontSize]
                                }),
                            }]}>饮食</Animated.Text>
                        </TouchableHighlight>
                    </Animated.View>

                    <Animated.View style={[{transform: [{
                            rotateZ:this.state.rotation.interpolate({
                                inputRange: [0,1],
                                outputRange: [startRotation, endRotation]
                            })
                          }],

                            left: this.state.sportLeft.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlLeft+controlRaius-startRadius, 30]
                            }),
                            top: this.state.sportTop.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlTop+controlRaius-startRadius, 30]
                            }),
                            backgroundColor: backColors[types.SolTypes.Sport],
                            borderRadius:this.state.viewRadius.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius, endRadius]
                            }),
                            width:this.state.viewWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            height:this.state.viewHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            opacity:this.state.opacity,
                            justifyContent: 'center',
                            alignItems:'center',
                            position:"absolute",
                        }]}>
                        <TouchableHighlight onPress={()=>{this._switchSolWindow(2);}}>
                            <Animated.Text style={[{
                                fontSize:this.state.fontSize.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [startFontSize, endFontSize]
                                }),
                            }]}>运动</Animated.Text>
                        </TouchableHighlight>
                    </Animated.View>

                    <Animated.View style={[{transform: [{
                            rotateZ:this.state.rotation.interpolate({
                                inputRange: [0,1],
                                outputRange: [startRotation, endRotation]
                            })
                          }],

                            left: this.state.sleepLeft.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlLeft+controlRaius-startRadius,10]
                            }),
                            top: this.state.sleepTop.interpolate({
                             inputRange: [0, 1],
                             outputRange: [controlTop+controlRaius-startRadius, controlTop+controlRaius-endRadius]
                            }),
                            backgroundColor: backColors[types.SolTypes.Sleep],
                            borderRadius:this.state.viewRadius.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius, endRadius]
                            }),
                            width:this.state.viewWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            height:this.state.viewHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [startRadius*2, endRadius*2]
                            }),
                            opacity:this.state.opacity,
                            justifyContent: 'center',
                            alignItems:'center',
                            position:"absolute",
                        }]}>
                        <TouchableHighlight onPress={()=>{this._switchSolWindow(3);}}>
                            <Animated.Text style={[{
                                fontSize:this.state.fontSize.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [startFontSize, endFontSize]
                                }),
                            }]}>睡眠</Animated.Text>
                        </TouchableHighlight>
                    </Animated.View>
                    <TouchableHighlight style={{left:controlLeft,top:controlTop,width:controlRaius*2,height:controlRaius*2,}} onPress={this._toogle.bind(this)}>
                        <Image style={{width:controlRaius*2,height:controlRaius*2,}} source={src}></Image>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    componentDidMount() {
    }

    _toogle(){
        let toValue = this.state.expended?0:1;
        this.setState({
           expended:!this.state.expended
        });
        Animated.parallel(
            ['dietLeft','dietTop','sportLeft','sportTop','sleepLeft','sleepTop',
                'rotation','viewRadius','viewWidth','viewHeight','fontSize','opacity'].map(property=>{
                return Animated.timing(
                    this.state[property],
                    {
                        easing: Easing.linear,
                        duration: spend,
                        toValue: toValue,
                    }
                )
            })
        ).start();
    }

    _switchSolWindow(type){
        this._toogle();
        let component={[types.SolTypes.Diet]:{component:DietContainer,name:"Diet"},
            [types.SolTypes.Sport]:{component:SportContainer,name:"Sport"},
            [types.SolTypes.Sleep]:{component:SleepContainer,name:"Sleep"}};
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.replace(component[type]);
        });
    }
}

let styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:v_width,
        height:v_height,
        left:width-v_width-30,
        top:height-v_height-50,
    },
});