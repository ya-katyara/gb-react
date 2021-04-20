
import React from 'react';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const PushToggle = ({handleClick}) => {
    return (
        <div onClick={handleClick}>
            <NotificationsOffIcon className="push" />
        </div>
    )
}

export default PushToggle;