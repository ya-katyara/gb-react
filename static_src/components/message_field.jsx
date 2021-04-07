import React, { useEffect } from 'react';
import Message from './message/message';
import MessageSend from './message_send';
import { AUTHORS } from '../utils/constants';

const MessageField = ({messages, handleAddMessage}) => {

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[messages.length-1];
      
      let timeout;
      if (lastMessage.author === AUTHORS.me) {
        const message = {
          text: 'u sure?'
        }
        timeout = setTimeout(() => handleAddMessage(message), 1500);
      }
      

      return () => clearTimeout(timeout);
    }
  }, [messages]);

  return <>
    <div className="messages">
      {messages.length > 0 && messages.map((message) => <Message key={message.id} message={ message } />)}
      {messages.length === 0 && <div>No messages in this chat yet</div>}
    </div>
    <div className="text_wrapper">
      <MessageSend addMessage={handleAddMessage} />
    </div>
  </>;
};

export default MessageField;