import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const NotificationView = ({ message }: { message: string }) => {
    const style = {
        color: 'white',
        backgroundColor: 'black',
        borderStyle: 'thick solid black',
        padding: '2em',
        display: 'inline-block'
    };

    return <div style={style}>{message}</div>;
};

const Notification = () => {
    const message = useSelector((state: RootState) => state.notification);

    return (
        message === ''
            ? null
            : <NotificationView message={message} />
    );
};

export default Notification;