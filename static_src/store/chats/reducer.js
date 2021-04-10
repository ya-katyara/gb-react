import { ADD_CHAT, ADD_MESSAGE } from './types';
import { AUTHORS } from '../../utils/constants';

const initialState = {
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
    default:
      return state;
  }
}