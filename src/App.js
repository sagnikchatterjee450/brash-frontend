import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReportEditPage from './pages/ReportEditPage';
import ReportResultsPage from './pages/ReportResultsPage';
import ReportViewPage from './pages/ReportViewPage';
import NavBar from './components/NavBar';
import AuthContext from './auth/auth-context';
import useAuth from './auth/auth-hook';

import './App.scss';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/about' exact>
          <AboutPage />
        </Route>
        <Route path='/report/edit' exact>
          <ReportEditPage />
        </Route>
        <Route path='/report/results' exact>
          <ReportResultsPage />
        </Route>
        <Route path='/:userId/report' exact>
          <ReportViewPage />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/about' exact>
          <AboutPage />
        </Route>
        <Route path='/login' exact>
          <LoginPage />
        </Route>
        <Route path='/register' exact>
          <RegisterPage />
        </Route>
        <Route path='/:userId/report' exact>
          <ReportViewPage />
        </Route>
        <Redirect to='/login' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <NavBar />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
