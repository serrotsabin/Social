import React from 'react';
import './App.css';
import {BrowserRouter , Route , Switch} from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar from './components/layout/Navbar';

import AuthRoute from './utils/AuthRoute.js'

import { themes } from './utils/themes';

import jwtDecode from 'jwt-decode';

import {Provider} from 'react-redux';
import store from './redux/store';

import {SET_AUTHENTICATED} from './redux/types';

import {getUserData,logoutUser} from './redux/actions/userActions';
import axios from 'axios';

import user from './pages/user';

const theme = createMuiTheme(themes)

const token = localStorage.FBIdToken

axios.defaults.baseURL = 'https://us-central1-social-b663b.cloudfunctions.net/api'

if (token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login' 
  }else{
    store.dispatch({type:SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar/>
          <div className='container'>
          <Switch>
            <Route exact path='/' component = {home} />
            <AuthRoute exact path='/signup' component = {signup}/>
            <AuthRoute exact path='/login' component = {login}/>
            <Route exact path ='/users/:handle' component={user} />
            <Route exact path ='/users/:handle/scream/:screamId' component={user} />
          </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
