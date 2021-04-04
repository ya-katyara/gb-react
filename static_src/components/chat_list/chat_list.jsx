import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { AUTHORS } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '45ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ChatList = ({chats}) => {
  const classes = useStyles();

  const getLastMessageContent = (messages) => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      return (lastMessage.author === AUTHORS.me ? `${AUTHORS.me}: ` : '') + lastMessage.text;
    }
  }

  return chats.map(({id, user, messages}, idx) => (
      <List key={id} className={classes.root}>
        <Link to={`/chat/${id}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user} />
            </ListItemAvatar>
            <ListItemText
              primary={user}
              secondary={getLastMessageContent(messages)}
            />
          </ListItem>
        </Link>
        {idx !== chats.length-1 && <Divider variant="inset" component="li" />}
      </List>
    ));
};

export default ChatList;