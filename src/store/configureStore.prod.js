import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { rootEpic } from './rootEpic'
import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware()

const configureStore = (preloadedState, history) => {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      epicMiddleware
    )
  )

  epicMiddleware.run(rootEpic)

  return store
}

export default configureStore