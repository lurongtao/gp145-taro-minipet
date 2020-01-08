const defaultValue = 0
import { CHANGEID } from '../constants/id'

export default (state=defaultValue, action) => {
  if (action.type === CHANGEID) {
    return action.id
  }
  return state
}