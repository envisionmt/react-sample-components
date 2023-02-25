import React, { Component } from "react"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux"
import compose from "recompose/compose"
import { withStyles } from "@material-ui/core/styles"
import { USER_FETCH_REQUEST_ } from '../store/user'
import PropTypes from 'prop-types'
import logo from '../resources/logo.png'

import { get as getCookie } from 'es-cookie'
import { ajax } from 'rxjs/ajax'
import { map, switchMap, catchError } from 'rxjs/operators'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 'auto',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '200px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class Login extends Component {

  state = {
    name: "rising",
    password: "Jang1995",
  }

  handleSubmit = prop => (e) => {
    e.preventDefault();

    prop.userFetch(this.state.name, this.state.password)
  }
  
  handleChange = name => (event) => {
    this.setState({[name]: event.target.value})
  }

  render() {

    const { classes } = this.props
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <img src={logo} alt='Logo' className={classes.logo}/>

          <form className={classes.form} noValidate onSubmit={this.handleSubmit(this.props)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={this.state.password}
              autoComplete="current-password"
              onChange={this.handleChange('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  userFetch:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userFetch: (name, password) => dispatch(USER_FETCH_REQUEST_(name, password))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Login);