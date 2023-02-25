import { combineEpics } from 'redux-observable'
import { epics as photos } from './photos'
import { epics as user } from './user'

export const rootEpic = combineEpics(
  ...photos,
  ...user
)