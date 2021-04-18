import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import MessageField from '../components/message_field';
import ChatList from '../components/chat_list/chat_list';

import { useDispatch, useSelector } from 'react-redux';
import { addChat, getChats } from '../store/chats/actions';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Layout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {chatId} = useParams();

  const chats = useSelector(state => state.chats.chats_list);

  if (chatId && !chats[`chat${chatId}`]) {
    history.replace('/chat');
  }

  // useEffect(() => {
  //   dispatch(getChats());
  // }, []);

  const handleAddChat = () => {
    const chat = {
      id: Object.keys(chats).length + 1,
      user: "Someone else",
      messages: []
    }
    dispatch(addChat(chat));
  }

  return <Grid container spacing={0}>
          <Grid item xs={12} md={3} className="sidebar">
            <ChatList chats={Object.values(chats)} />
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleAddChat}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} md={9}>
            { chatId && chats[`chat${chatId}`] && 
            <div className="container flex flex-column">
              <MessageField messages={chats[`chat${chatId}`].messages} />
            </div> }
          </Grid>
        </Grid>
};

export default Layout;

Layout.propTypes = {
  chatId: PropTypes.number
};

Layout.defaultProps = {
  chatId: null
}