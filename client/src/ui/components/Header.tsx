import React from 'react';

interface HeaderProps {
  totalDevelopers: number;
  onSendNotification: () => void;
}

function Header({ totalDevelopers, onSendNotification }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>Affectation des Développeurs</h1>
        <p>Gérez les affectations entre les équipes Build et Run</p>
      </div>
      <button className="notif-btn" onClick={onSendNotification}>
        send notif
      </button>
      <div className="total">Total développeurs : {totalDevelopers}</div>
    </header>
  );
}

export default Header;
