import React from 'react';
import Message from './message/message';
import MessageSend from './message_send';
import { addMessageWithResponse } from '../store/chats/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const MessageField = ({messages}) => {
  const dispatch = useDispatch();
  const {chatId} = useParams();

  const handleAddMessage = (message) => {
    dispatch(addMessageWithResponse({
      chatId,
      message
    }))
  };

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