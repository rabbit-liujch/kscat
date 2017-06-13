/**
 * Created by Administrator on 2016/8/16.
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
    Navigator
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Health from './Health';

const HEALTH = 'health'
const HEALTH_NORMAL = require('../images/main/foot_jk.png')
const HEALTH_ACTIVE = require('../images/main/foot_jk_s.png')
const SPORT = 'sport'
const SPORT_NORMAL = require('../images/main/foot_hd.png')
const SPORT_ACTIVE = require('../images/main/foot_hd_s.png')
const DISCOVER = 'discover'
const DISCOVER_NORMAL = require('../images/main/foot_fx.png')
const DISCOVER_ACTIVE = require('../images/main/foot_fx_s.png')
const MINE = 'mine'
const MINE_NORMAL = require('../images/main/foot_wd.png')
const MINE_ACTIVE = require('../images/main/foot_wd_s.png')

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {activeTab:HEALTH}
    }

    _renderTabItem(tag,imgNormal,imgActive, childView){
        return (
            <TabNavigator.Item
                selected={this.state.activeTab==tag}
                renderIcon={()=> <Image style={styles.tabIcon} source={imgNormal} />}
                renderSelectedIcon={()=> <Image style={styles.tabIcon} source={imgActive} />}
                onPress={()=>this.setState({activeTab:tag})}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag){
        return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1, borderRadius: 5}}>
                <TabNavigator tabBarStyle={styles.tab}>
                    {this._renderTabItem(HEALTH,HEALTH_NORMAL,HEALTH_ACTIVE,<Health {...this.props}/>)}
                    {this._renderTabItem(SPORT,SPORT_NORMAL,SPORT_ACTIVE,Main._createChildView(SPORT))}
                    {this._renderTabItem(DISCOVER,DISCOVER_NORMAL,DISCOVER_ACTIVE,Main._createChildView(DISCOVER))}
                    {this._renderTabItem(MINE,MINE_NORMAL,MINE_ACTIVE,Main._createChildView(MINE))}
                </TabNavigator>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});