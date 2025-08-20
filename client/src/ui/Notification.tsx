import React, { useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ visible }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="notification">
      Modification effectuée par un autre utilisateur
    </div>
  );
};

export default Notification;

