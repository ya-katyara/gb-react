import React, { useEffect, useState } from 'react';
import Message from './message';

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
    if (lastMessage.author === 'user') {
      const message = {
        text: 'u sure?',
        author: 'bot'
      }
      setTimeout(() => addMessage(message), 1500);
    }

  }, [messages]);

  const addMessage = (message) => {
    setMessages(prevState => {
      return [
        ...prevState,
        message
      ]
    })
  }

  const handleAddMessage = () => {
    const message = {
      text: "I'm fine",
      author: 'user'
    }
    addMessage(message);
  }

  return <>
    {messages.map((message, idx) => <Message key={idx} message={ message } />)}
    <button onClick={handleAddMessage}>Новое сообщение</button>
  </>;
};

export default MessageField;