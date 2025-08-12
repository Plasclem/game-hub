import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useAssignments } from '../behavior/useAssignments';
import { sendNotification, subscribeNotifications } from '../services/notificationService';
import Header from './components/Header';
import Board from './components/Board/Board';
import FreeSection from './components/Board/FreeSection';
import Notification from './components/Notification';

function App() {
  const { data, saved, handleDragEnd, totalDevelopers } = useAssignments();
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const unsub = subscribeNotifications(() => setNotification(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        totalDevelopers={totalDevelopers}
        onSendNotification={sendNotification}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board build={data.build} run={data.run} />
        <FreeSection developers={data.free} />
      </DragDropContext>
      {saved && <div className="success">Sauvegarde réussie</div>}
      <Notification
        visible={notification}
        message="Modification effectuée par un autre utilisateur"
      />
    </>
  );
}

export default App;
