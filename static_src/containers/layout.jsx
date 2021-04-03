import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MessageField from '../components/message_field';
import ChatList from '../components/chat_list/chat_list';
import Header from './header';

const Layout = () => {

  return <>
    <Header />
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={3} className="sidebar">
          <ChatList />
        </Grid>
        <Grid item xs={9}>
          <div className="container">
            <MessageField />
          </div>
        </Grid>
      </Grid>
    </Container>
  </>
};

export default Layout;