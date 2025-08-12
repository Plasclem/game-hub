import React from 'react';

interface NotificationProps {
  visible: boolean;
  message: string;
}

function Notification({ visible, message }: NotificationProps) {
  if (!visible) return null;
  return <div className="notification">{message}</div>;
}

export default Notification;
