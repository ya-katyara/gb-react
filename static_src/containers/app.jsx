import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Header from './header';
import Layout from './layout';
import Profile from '../components/profile';

const App = () => {
  return <>
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/chat">
            <Layout />
          </Route>
          <Route exact path="/chat/:chatId">
            <Layout />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  </>
};

export default App;