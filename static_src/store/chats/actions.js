import { ADD_CHAT, ADD_MESSAGE } from './types';

export const addChat = (chat) => ({
  type: ADD_CHAT,
  payload: chat
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});