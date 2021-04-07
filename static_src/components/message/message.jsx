import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import styles from './styles.module.scss';
import cn from 'classnames';
import { AUTHORS } from '../../utils/constants';

const Message = ({message}) => {

  return <>
          <Card className={cn(styles.card, {[styles.right]: message.author === AUTHORS.me})}>
          <CardHeader
            avatar={
              <Avatar>
                {message.author.substring(0,1).toUpperCase()}
              </Avatar>
            }
            title={message.author}
            subheader={new Date().toDateString()}
          />
            <CardContent>
              {message.text}
            </CardContent>
          </Card>
        </>
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string,
  })
};

export default Message;