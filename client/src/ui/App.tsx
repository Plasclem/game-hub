import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Header from './components/Header';
import Board from './components/Board/Board';
import Notification from './Notification';
import { useAssignments } from '../behavior/useAssignments';
import { sendNotification, subscribeNotifications } from '../services/notificationService';
import features from '../config';
import { getSnapshotLabels, getSnapshot, saveSnapshot } from '../services/snapshotService';
import { Assignment } from '../types';
import './App.css';

function App() {
  const { data, saved, handleDragEnd } = useAssignments();
  const [notification, setNotification] = useState(false);
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [view, setView] = useState<'current' | string>('current');
  const [snapshotData, setSnapshotData] = useState<Assignment | null>(null);
  const dragDefault = useRef(features.dragAndDrop);

  useEffect(() => {
    const unsub = subscribeNotifications(() => setNotification(true));
    return unsub;
  }, []);

  useEffect(() => {
    getSnapshotLabels().then(setSnapshots);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showSnapshot = async (label: string) => {
    const snap = await getSnapshot(label);
    setSnapshotData(snap);
    setView(label);
    features.dragAndDrop = false;
    features.readOnly = true;
  };

  const showCurrent = () => {
    setView('current');
    setSnapshotData(null);
    features.readOnly = false;
    features.dragAndDrop = dragDefault.current;
  };

  const handleSaveSnapshot = async () => {
    if (!data) return;
    const label = prompt('Nom du snapshot ?');
    if (!label) return;
    try {
      await saveSnapshot(label, data);
      const labels = await getSnapshotLabels();
      setSnapshots(labels);
    } catch (e) {
      alert('Label déjà existant');
    }
  };

  const displayedData = view === 'current' ? data : snapshotData;
  const total = displayedData
    ? displayedData.build.length +
      displayedData.run.anomalies.length +
      displayedData.run.service.length +
      displayedData.run.fastTrack.length +
      displayedData.free.length
    : 0;

  if (!displayedData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        totalDevelopers={total}
        onSendNotification={sendNotification}
        snapshots={snapshots}
        onSaveSnapshot={view === 'current' ? handleSaveSnapshot : undefined}
        onViewSnapshot={showSnapshot}
        onViewCurrent={showCurrent}
        currentView={view}
      />
      <DragDropContext onDragEnd={features.dragAndDrop ? handleDragEnd : () => {}}>
        <Board data={displayedData} />
      </DragDropContext>
      {view === 'current' && saved && <div className="success">Sauvegarde réussie</div>}
      <Notification visible={notification} />
    </>
  );
}

export default App;

