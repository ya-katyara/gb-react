import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { AUTHORS } from '../utils/constants';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    width: '100%'
  }
}));

const MessageSend = ({addMessage}) => {
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const handleChange = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({
      text: message,
      author: AUTHORS.me
    });
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <TextField id="standard-basic" className={classes.input} label="Message" value={message} onChange={handleChange} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </form>
  )
}

export default MessageSend