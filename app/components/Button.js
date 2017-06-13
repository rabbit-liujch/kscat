/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, { Component } from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor}
                activeOpacity={0.5}
                style={this.props.style}
                onPress={this.props.onPress}
            >
                <Text style={this.props.textStyle}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}