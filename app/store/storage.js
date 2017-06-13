/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';
import Storage from 'react-native-storage';

const storage = new Storage({
    size:1000,
    defaultExpires:null
});

export default storage;