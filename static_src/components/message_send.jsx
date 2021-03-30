import React, { useState } from 'react';

const MessageSend = ({addMessage}) => {
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({
      text: message,
      author: 'user'
    });
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <input type="submit" value="Send"/>
    </form>
  )
}

export default MessageSend