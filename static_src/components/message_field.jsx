import React, { useEffect, useState } from 'react';
import Message from './message';
import MessageSend from './message_send';

const MessageField = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Hello',
      author: 'bot'
    },
    {
      text: "How's it goin'?",
      author: 'bot'
    }
  ]);

  useEffect(() => {
    const lastMessage = messages[messages.length-1];
    let timeout;
    if (lastMessage.author === 'user') {
      const message = {
        text: 'u sure?',
        author: 'bot'
      }
      timeout = setTimeout(() => addMessage(message), 1500);
    }

    return () => clearTimeout(timeout);
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prevState => {
      return [
        ...prevState,
        message
      ]
    })
  }

  return <>
    {messages.map((message, idx) => <Message key={idx} message={ message } />)}
    <MessageSend addMessage={addMessage} />
  </>;
};

export default MessageField;