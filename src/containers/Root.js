import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { theme } from './themes'
import App from '../components/App'
import PrivateRoute from '../components/common/PrivateRoute'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import Login from '../components/Login'

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <Route exact path="/photo" component={App} />
          <Route exact path="/login" component={Login} />
        </Switch>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root