import { CHANGEID } from '../constants/id'

export const changeId = (id) => {
  return {
    type: CHANGEID,
    id
  }
}