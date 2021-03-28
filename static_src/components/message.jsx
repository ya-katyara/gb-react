import React from 'react';
import PropTypes from 'prop-types';

const Message = ({message}) => <div>{`${message.author}: ${message.text}`}</div>;

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string,
  })
};

export default Message;