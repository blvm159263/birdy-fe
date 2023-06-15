import React, { createContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (mess, desc) => {
        api['success']({
            message: mess ,
            description:
                 desc ,
        });
    };
    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={openNotificationWithIcon}>
                {children}
            </NotificationContext.Provider>
        </>
    );
};

export { NotificationProvider, NotificationContext }