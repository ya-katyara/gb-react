import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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

const chats = [
  {
    id: 1,
    username: 'Ali Connors',
    message: " — I'll be in your neighborhood doing errands this…"
  },
  {
    id: 2,
    username: 'User Name',
    message: " — Let's meet up tomorrow at about..."
  },
  {
    id: 3,
    username: 'Another User',
    message: " — Hey have you heard about this new thing..."
  },
];

const ChatList = () => {
  const classes = useStyles();

  return chats.map((chat, idx) => (
      <List key={chat.id} className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={chat.username} />
          </ListItemAvatar>
          <ListItemText
            primary={chat.username}
            secondary={chat.message}
          />
        </ListItem>

        {idx !== chats.length-1 && <Divider variant="inset" component="li" />}
      </List>
    ));
};

export default ChatList;