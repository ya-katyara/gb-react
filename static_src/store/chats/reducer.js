import { ADD_CHAT, ADD_MESSAGE, SET_NOTIFICATION, DELETE_MESSAGE, DELETE_CHAT } from './types';
import { AUTHORS } from '../../utils/constants';

const initialState = {
  chat1: {
    id: 1,
    user: AUTHORS.bot,
    isNewMessage: false,
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
    isNewMessage: false,
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
    isNewMessage: false,
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
}

export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      const chat_id = Object.entries(state).length + 1;
      return {
        ...state,
        [`chat${chat_id}`]: {
          ...action.payload, 
          id: chat_id
        }
      }
    }
    case SET_NOTIFICATION: {
      const {chatId, isNewMessage} = action.payload;
      return {
        ...state,
        [`chat${chatId}`]: {
          ...state[`chat${chatId}`],
          isNewMessage
        }
      }
    }
    case ADD_MESSAGE: {
      const message = action.payload.message;
      const key = `chat${action.payload.chatId}`;
      const chat = state[key];
      if (!message.author) {
        message.author = chat.user;
      }

      return {
        ...state,
        [key]: {
          ...chat,
          messages: [...chat.messages, {
            ...message,
            id: chat.messages.length + 1
          }],
        }
      }
    }
    case DELETE_MESSAGE: {
      const {chatId, messageId} = action.payload;
      const key = `chat${chatId}`;
      const chat = state[key];
      return {
        ...state,
        [key]: {
          ...chat,
          messages: [...chat.messages.filter(item => item.id != messageId)]
        }
      }
    }
    case DELETE_CHAT: {
      const chatId = action.payload;
      const key = `chat${chatId}`;
      const newChats = {...state};
      delete newChats[key];
      return newChats;
    }
    default:
      return state;
  }
}