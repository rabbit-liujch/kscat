/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import Button from '../components/Button';
import request from '../net/MyRequest';
import storage from '../store/storage';

import MainContainer from '../containers/MainContainer'

var {height, width} = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'13912900953',
            pwd:'987624'
        }
    }

    componentDidMount(){
    }

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgImageWrapper}>
                    <Image source={require("../images/login/login_bj.png")} style={styles.bgImage} />
                </View>
                <View style={styles.loginTxtView}><Text style={styles.loginTxt}>登录</Text></View>
                <View><TextInput placeholder="手机号" ref={(name)=>this._name=name} placeholderTextColor="#D3D3D3"
                                 autoFocus={true}
                                 onChangeText={name=>this.setState({name})} /></View>
                <View><TextInput placeholder="密码(6-16位字母、数字、符号组成)" secureTextEntry={true}
                                 placeholderTextColor="#D3D3D3"
                                 onChangeText={pwd=>this.setState({pwd})}/></View>
                <View>
                    <Button
                        underlayColor='#4169e1'
                        onPress={()=>this._login()}
                        style={styles.loginBtnStyle}
                        textStyle={styles.loginTxtStyle}
                        text='登录'>
                    </Button>
                </View>
            </View>
        );
    }

    async _login() {
        let tgtData = await request('https://58.213.69.194:8444/cas/v1/tickets',{
            body:{
                "username":this.state.name,
                "password":this.state.pwd,
                "deviceId":"123"
            }
        });

        let stData = await request(tgtData.TGT,{
            body:{
                "service":"https://58.213.69.194:3445/jktool/cas"
            }
        });

        let tokenData = await request("https://58.213.69.194:3445/jktool/cas",{
            body:{
                "ticket":stData.ST
            }
        });

        storage.save({
            key:"loginState",
            rawData:Object.assign({}, tgtData, tokenData)
        });

        const {navigator} = this.props;
        navigator.resetTo({
           component: MainContainer,
            name: "Main"
        });
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column'
    },
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        height:height,
        width:width
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },
    loginTxtView:{
        height:100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTxt:{
        fontSize: 18,
        color: '#008000',
    },
    loginBtnStyle:{
        backgroundColor: '#008000',
        height:36,
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTxtStyle:{
        fontSize: 12,
        color: 'white',
        marginTop: 6,
        marginBottom: 6,
    }
});