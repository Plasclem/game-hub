import React from 'react';
import './Header.css';

interface HeaderProps {
  totalDevelopers: number;
  onSendNotification: () => void;
  snapshots: string[];
  onSaveSnapshot?: () => void;
  onViewSnapshot: (label: string) => void;
  onViewCurrent: () => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({
  totalDevelopers,
  onSendNotification,
  snapshots,
  onSaveSnapshot,
  onViewSnapshot,
  onViewCurrent,
  currentView,
}) => {
  return (
    <header className="header">
      <div>
        <h1>Affectation des Développeurs</h1>
        <p>Gérez les affectations entre les équipes Build et Run</p>
        <div className="snapshot-controls">
          <button onClick={onViewCurrent} disabled={currentView === 'current'}>
            Vue courante
          </button>
          {onSaveSnapshot && (
            <button onClick={onSaveSnapshot}>Sauvegarder snapshot</button>
          )}
          {snapshots.map((label) => (
            <button key={label} onClick={() => onViewSnapshot(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <button className="notif-btn" onClick={onSendNotification}>
        send notif
      </button>
      <div className="total">Total développeurs : {totalDevelopers}</div>
    </header>
  );
};

export default Header;

