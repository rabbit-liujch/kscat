/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Main from '../pages/Main'

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Main {...this.props} />
        );
    }
}

function mapStateToProps(state){
    const {health} = state;
    return {
        health
    }
}

export default connect(mapStateToProps)(MainContainer);