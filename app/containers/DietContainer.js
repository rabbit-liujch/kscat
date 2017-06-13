/**
 * Created by Administrator on 2016/8/16.
 */
'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Diet from '../pages/Diet'

class DietContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Diet {...this.props} />
        );
    }
}

function mapStateToProps(state){
    const {diet} = state;
    return {
        diet
    }
}

export default connect(mapStateToProps)(DietContainer);