/**
 * index.js 用于管理所有的redux中的reducers
 */

import { combineReducers } from 'redux'

// 主题色管理
import ColorReducers from "./colorReducers"
 
const allReducers = {
    ColorReducers
};
 
const rootReducers = combineReducers(allReducers);
 
export default rootReducers