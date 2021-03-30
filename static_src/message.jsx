import React, { useState } from 'react';

const MessageComponent = ({text}) => <div>{text}</div>;

const MessageField = () => {
  const [messages, setMessages] = useState(['Привет', 'Как дела?']);

  const handleAddMessage = () => {
    const message = "всё ок";
    setMessages(prevState => {
      return [
        ...prevState,
        message
      ]
    })
  }

  return (<>
    {messages.map(message => <MessageComponent text={ message } />)}
    <button onClick={handleAddMessage}>Новое сообщение</button>
  </>);
};

export default MessageField;