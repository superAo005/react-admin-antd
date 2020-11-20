import { createStore } from 'redux'
import RootReducers from '@/redux/reducers/index'
 
// 创建store
const store = createStore(RootReducers)
 
export default store;