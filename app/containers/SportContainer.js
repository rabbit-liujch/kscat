/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Sport from '../pages/Sport'

class SportContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sport {...this.props} />
        );
    }
}

function mapStateToProps(state){
    const {sport} = state;
    return {
        sport
    }
}

export default connect(mapStateToProps)(SportContainer);