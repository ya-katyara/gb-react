import { ADD_CHAT, ADD_MESSAGE, SET_NOTIFICATION, DELETE_MESSAGE, DELETE_CHAT } from './types';
import { AUTHORS } from '../../utils/constants';

export const addChat = (chat) => ({
  type: ADD_CHAT,
  payload: chat
});

export const setNotification = (chatInfo) => ({
  type: SET_NOTIFICATION,
  payload: chatInfo
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export const deleteMessage = (message) => ({
  type: DELETE_MESSAGE,
  payload: message
});

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  payload: chatId
});

export const addMessageWithResponse = ({chatId, message}) => {
  return (dispatch, getState) => {
    dispatch(addMessage({chatId, message}));
    const messages = getState().chats[`chat${chatId}`]?.messages;
    if (messages && messages.length) {
      const lastMessage = messages[messages.length-1];
      
      if (lastMessage.author === AUTHORS.me) {
        const message = {
          text: 'u sure?'
        }
        setTimeout(() => {
          dispatch(addMessage({chatId, message}));
          dispatch(setNotification({chatId, isNewMessage: true}));
          setTimeout(() => dispatch(setNotification({chatId, isNewMessage: false})), 2000)
        }, 1500);
      }
    }
  };
};