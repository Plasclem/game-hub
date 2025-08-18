import React from 'react';
import './Header.css';

interface HeaderProps {
  totalDevelopers: number;
  onSendNotification: () => void;
  snapshots: string[];
  onSaveSnapshot?: () => void;
  onDeleteSnapshot: (label: string) => void;
  onViewSnapshot: (label: string) => void;
  onViewCurrent: () => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({
  totalDevelopers,
  onSendNotification,
  snapshots,
  onSaveSnapshot,
  onDeleteSnapshot,
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
          {snapshots.map((label) => (
            <div key={label} className="snapshot-item">
              <button onClick={() => onViewSnapshot(label)}>{label}</button>
              <button
                className="delete-snapshot-btn"
                onClick={() => onDeleteSnapshot(label)}
                aria-label={`Supprimer ${label}`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        {onSaveSnapshot && (
          <button className="save-snapshot-btn" onClick={onSaveSnapshot}>
            Sauvegarder snapshot
          </button>
        )}
        <button className="notif-btn" onClick={onSendNotification}>
          send notif
        </button>
      </div>
      <div className="total">Total développeurs : {totalDevelopers}</div>
    </header>
  );
};

export default Header;

