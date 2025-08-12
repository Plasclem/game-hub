import React from 'react';

interface NotificationProps {
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="notification">Modification effectuée par un autre utilisateur</div>
  );
};

export default Notification;

