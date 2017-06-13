/**
 * Created by Administrator on 2016/8/22.
 */
'use strict';
import React, { Component } from 'react';
import  {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
export default class ImageButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor}
                activeOpacity={0.5}
                style={this.props.style}
                onPress={this.props.onPress}
            >
                <Image style={this.props.imgStyle} source={this.props.source}></Image>
            </TouchableHighlight>
        );
    }
}