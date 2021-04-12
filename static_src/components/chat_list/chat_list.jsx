import React from 'react';
import { Link } from 'react-router-dom';

import { deleteChat } from '../../store/chats/actions';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

import cn from 'classnames';

import { AUTHORS } from '../../utils/constants';

import s from "./styles.module.scss";

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
  const dispatch = useDispatch();

  const getLastMessageContent = (messages) => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      return (lastMessage.author === AUTHORS.me ? `${AUTHORS.me}: ` : '') + lastMessage.text;
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteChat(id));
  }

  return chats.map(({id, isNewMessage, user, messages}, idx) => (
      <List key={id} className={cn(classes.root, {
        [s.blinking]: isNewMessage,
      })}>
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
              <DeleteIcon className={s.delete_btn} onClick={() => handleDelete(id)} />
        </Link>
        {idx !== chats.length-1 && <Divider variant="inset" component="li" />}
      </List>
    ));
};

export default ChatList;