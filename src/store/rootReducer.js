import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reduce as photos } from './photos'
import { reduce as user} from './user'

export default history => combineReducers({
  router: connectRouter(history),
  photos,
  user,
})