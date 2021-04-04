import React, { useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import MessageField from '../components/message_field';
import ChatList from '../components/chat_list/chat_list';
import { AUTHORS } from '../utils/constants';

const initialChats = {
  chat1: {
    id: 1,
    user: AUTHORS.bot,
    messages: [
        {
          id: 1,
          text: 'Hello',
          author: AUTHORS.bot
        },
        {
          id: 2,
          text: "My dear friend!",
          author: AUTHORS.bot
        }
    ],
  },
  chat2: {
    id: 2,
    user: AUTHORS.alex_bot,
    messages: [
        {
          id: 1,
          text: 'Hello',
          author: AUTHORS.alex_bot
        },
        {
          id: 2,
          text: "How's it goin'?",
          author: AUTHORS.alex_bot
        }
    ],
  },
  chat3: {
    id: 3,
    user: AUTHORS.billy_bot,
    messages: [
        {
          id: 1,
          text: 'Sup?',
          author: AUTHORS.billy_bot
        },
        {
          id: 2,
          text: "Doin' alright!",
          author: AUTHORS.me
        }
    ],
  }
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Layout = () => {
  const classes = useStyles();
  const {chatId} = useParams();

  const [chats, setChats] = useState(initialChats);

  const history = useHistory();
  
  if (chatId && !chats[`chat${chatId}`]) {
    history.replace('/chat');
  }

  const addMessage = useCallback((message) => {
    setChats(prevState => {
      const key = `chat${chatId}`;
      const prevChat = prevState[key];
      message.id = prevChat.messages.length + 1;
      if (!message.author) {
        message.author = prevState[key].user;
      }

      return {
        ...prevState,
        [key]: {
          ...prevChat,
          messages: [...prevChat.messages, message],
        }
      }
    })
  }, [chatId]);

  const addChat = () => {
    const chat = {
      id: Object.keys(chats).length + 1,
      user: "Someone else",
      messages: []
    }
    setChats(prevState => {
      return {
          ...prevState,
          [`chat${chat.id}`]: {...chat}
        }
    })
  }

  return <Grid container spacing={0}>
          <Grid item xs={3} className="sidebar">
            <ChatList chats={Object.values(chats)} />
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={addChat}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={9}>
            { chatId && chats[`chat${chatId}`] && 
            <div className="container flex flex-column">
              <MessageField messages={chats[`chat${chatId}`].messages} handleAddMessage={addMessage} />
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