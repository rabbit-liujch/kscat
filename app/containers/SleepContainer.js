/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Sleep from '../pages/Sleep'

class SleepContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sleep {...this.props} />
        );
    }
}

function mapStateToProps(state){
    const {sleep} = state;
    return {
        sleep
    }
}

export default connect(mapStateToProps)(SleepContainer);