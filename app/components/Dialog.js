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
    Easing,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity:new Animated.Value(0),
            hide: true,
        }
    }

    render() {
         if(this.state.hide){
            return (<View />)
        } else {
            return (
                <View style={styles.container} >
                    <Animated.View style={[styles.mask,{opacity:this.state.opacity}]}></Animated.View>
                    <Animated.View style={[styles.tip , {transform: [{
                            translateY: this.state.offset.interpolate({
                             inputRange: [0, 1],
                             outputRange: [height, (height-aHeight -34)]
                            }),
                          }],
                          overflow:"visible"
                        }]}>
                        {this.props.children}
                        <TouchableHighlight style={styles.button} activeOpacity={0.5} onPress={this.iknow.bind(this)}>
                            <Image style={{width:24,height:24}} source={require("../images/diet/exchange_cancel.png")}></Image>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            );
        }
    }

    componentDidMount() {
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start();

        setTimeout(
            () => this.setState({hide: true}),
            500
        );
    }

    //取消
    iknow(event) {
        if(!this.state.hide){
            this.out();
        }
    }

    show() {
        if(this.state.hide){
            this.setState({hide: false}, this.in);
        }
    }
}

let styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
        overflow:"visible"
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
    },
    tip: {
        width:width,
        height:aHeight,
        left:0,
        bottom:0,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
    },
    button: {
        height: 30,
        width:30,
        position:"absolute",
        right:10,
        top : 10
    },
});