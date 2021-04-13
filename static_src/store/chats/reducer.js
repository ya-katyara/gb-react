import { ADD_CHAT, ADD_MESSAGE, SET_NOTIFICATION, DELETE_MESSAGE, DELETE_CHAT, 
  GET_CHATS_REUQEST, GET_CHATS_SUCCESS, GET_CHATS_FAILURE, ADD_BOT_CONVERSATION } from './types';

const initialState = {
  chats_list: {},
  request: {
    loading: false,
    error: null,
  }
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      const chat_id = Object.entries(state).length + 1;
      return {
        ...state,
        chats_list: {
          ...state.chats_list,  
          [`chat${chat_id}`]: {
            ...action.payload, 
            id: chat_id
          }
        }
      }
    }
    case SET_NOTIFICATION: {
      const {chatId, isNewMessage} = action.payload;
      const key = `chat${chatId}`;
      const chat = state.chats_list[key];
      return {
        ...state,
        chats_list: {
          ...state.chats_list,
          [key]: {
            ...chat,
            isNewMessage
          }
        }
      }
    }
    case ADD_MESSAGE: {
      const message = action.payload.message;
      const key = `chat${action.payload.chatId}`;
      const chat = state.chats_list[key];
      if (!message.author) {
        message.author = chat.user;
      }
      return {
        ...state,
        chats_list: {
          ...state.chats_list,
          [key]: {
            ...chat,
            messages: [...chat.messages, {
              ...message,
              id: chat.messages.length + 1
            }],
          }
        }
      }
    }
    case DELETE_MESSAGE: {
      const {chatId, messageId} = action.payload;
      const key = `chat${chatId}`;
      const chat = state.chats_list[key];
      return {
        ...state,
        chats_list: {
          ...state.chats_list,
          [key]: {
            ...chat,
            messages: [...chat.messages.filter(item => item.id != messageId)]
          }
        }
      }
    }
    case DELETE_CHAT: {
      const chatId = action.payload;
      const key = `chat${chatId}`;
      const newChats = {...state};
      delete newChats.chats_list[key];
      return newChats;
    }
    case ADD_BOT_CONVERSATION: {
      const {chatId, conversationId} = action.payload;
      const key = `chat${chatId}`;
      const chat = state.chats_list[key];
      return {
        ...state,
        chats_list: {
          ...state.chats_list,
          [key]: {
            ...chat,
            conversationId
          }
        }
      }
    }
    case GET_CHATS_REUQEST: {
      return {
        ...state,
        request: {
          error: null,
          loading: true
        }
      }
    }
    case GET_CHATS_SUCCESS: {
      return {
        ...state,
        chats_list: action.payload,
        request: {
          error: null,
          loading: false
        }
      }
    }
    case GET_CHATS_FAILURE: {
      return {
        ...state,
        request: {
          error: action.payload,
          loading: false
        }
      }
    }
    default:
      return state;
  }
}