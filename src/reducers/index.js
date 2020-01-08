import { combineReducers } from 'redux'
import counter from './counter'
import id from './id'

export default combineReducers({
  counter,
  id
})
