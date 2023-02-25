import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs';
import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import axios from 'axios'

export const USER_FETCH_REQUEST = 'PHOTOS:FETCH_REQUEST'
export const USER_FETCHED = 'PHOTOS:FETCHED'
export const USER_FETCHED_ERORR = 'PHOTOS:FETCHED_ERROR'

export const USER_FETCH_REQUEST_ = (name, password) => 
  ({ type: USER_FETCH_REQUEST, name, password})
export const USER_FETCHED_ = photos =>
  ({ type: USER_FETCHED, photos })
export const USER_FETCHED_ERORR_ = (status, message) =>
  ({ type: USER_FETCHED_ERORR, status, message })

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: true,
  isLoading: false,
  user: null
}

export const reduce = (state = initState, action) => {

  switch(action.type) {
    default:
      return state
    case USER_FETCHED: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case USER_FETCHED_ERORR: {
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    }
  }
}

const config = {
  headers: {
    "Content-Type": "application/json"
  }
}
export const epics = [

  // actions$ => actions$.pipe(
  //   ofType(USER_FETCH_REQUEST),
  //   switchMap((action$) => {
  //     const name = action$.name;
  //     const password = action$.password;
  //     const body = JSON.stringify({name, password})
  //     ajax.post("http://localhost:8001/api/auth/login", body, config).pipe(
  //       map( response => 
  //         {
  //           debugger;
  //           USER_FETCHED_(response)
  //         },
  //       catchError(error => {
  //         debugger;
  //         of(USER_FETCHED_ERORR_(error.status, error.message))
  //       })))})),

  actions$ => actions$.pipe(
    ofType(USER_FETCH_REQUEST),
    switchMap((action$) => {
      const name = action$.name;
      const password = action$.password;
      const body = JSON.stringify({name, password})
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:8001/api/auth/login", body, config)
        .then( res => {
          debugger;
        })
        .catch( err=> {
          debugger;
        })
    })),
]