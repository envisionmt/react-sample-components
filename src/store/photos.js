import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs';
import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'

export const PHOTOS_FETCH_REQUEST = 'PHOTOS:FETCH_REQUEST'
export const PHOTOS_FETCHED = 'PHOTOS:FETCHED'
export const PHOTOS_FETCHED_ERORR = 'PHOTOS:FETCHED_ERROR'

export const PHOTOS_FETCH_REQUEST_ = (name) => 
  ({ type: PHOTOS_FETCH_REQUEST, name })
export const PHOTOS_FETCHED_ = photos =>
  ({ type: PHOTOS_FETCHED, photos })
export const PHOTOS_FETCHED_ERORR_ = (status, message) =>
  ({ type: PHOTOS_FETCHED_ERORR, status, message })

const initState = {
  photos: [],
}

export const reduce = (state = initState, action) => {

  switch(action.type) {
    default:
      return state
    case PHOTOS_FETCHED: {
      return {
        ...state,
        photos: action.photos
      }
    }
  }
}

export const epics = [

  actions$ => actions$.pipe(
    ofType(PHOTOS_FETCH_REQUEST),
    switchMap((action$) =>
      ajax.getJSON(action$.name).pipe(
        map( response => 
          PHOTOS_FETCHED_(response),
        catchError(error => 
          of(PHOTOS_FETCHED_ERORR_(error.status, error.message))))))),
]