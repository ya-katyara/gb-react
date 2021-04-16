import { ADD_CHAT, ADD_MESSAGE, SET_NOTIFICATION, DELETE_MESSAGE, DELETE_CHAT, 
  GET_CHATS_REUQEST, GET_CHATS_SUCCESS, GET_CHATS_FAILURE, ADD_BOT_CONVERSATION } from './types';
import { AUTHORS } from '../../utils/constants';
import axios from 'axios';

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

export const addBotConversation = (chatId) => ({
  type: ADD_BOT_CONVERSATION,
  payload: chatId
});

export const getChatsRequest = () => ({
  type: GET_CHATS_REUQEST
});

export const getChatsSuccess = (chats) => ({
  type: GET_CHATS_SUCCESS,
  payload: chats
});

export const getChatsFailure = (error) => ({
  type: GET_CHATS_FAILURE,
  payload: error
});

export const addMessageWithResponse = ({chatId, message}) => {
  return (dispatch, getState) => {
    dispatch(addMessage({chatId, message}));
    const messages = getState().chats.chats_list[`chat${chatId}`]?.messages;
    const conversation = getState().chats.chats_list[`chat${chatId}`]?.conversationId;

    if (messages && messages.length) {
      const lastMessage = messages[messages.length-1];
      
      if (lastMessage.author === AUTHORS.me) {
        getBotResponse(dispatch, chatId, lastMessage.text, conversation);
      }
    }
  };
};

const getBotResponse = async (dispatch, chatId, user_message, conversation) => {
  try {
    const requestData = {
      application: "4215741158084574695",
      instance: 165,
      message: user_message,
    };
    if (conversation) {
      requestData.conversation = conversation;
    }
    const result = await axios.post("https://www.botlibre.com/rest/json/chat", requestData);
    const response = result.data;
    const conversationId = response.conversation;
    dispatch(addBotConversation({chatId, conversationId}));
    const message = {
      text: response.message
    }
    dispatch(addMessage({chatId, message}));
    dispatch(setNotification({chatId, isNewMessage: true}));
    setTimeout(() => dispatch(setNotification({chatId, isNewMessage: false})), 2000);
  } catch (err) {
    console.log(err);
  }
}

export const getChats = () => async (dispatch) => {
  try {
    dispatch(getChatsRequest());
    const res = await axios.get("/api/messages.json");

    dispatch(getChatsSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getChatsFailure(err));
  }
}