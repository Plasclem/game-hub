import { useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { Assignment, Developer } from '../types';
import { getAssignments, saveAssignments } from '../services/assignmentService';
import { sendNotification } from '../services/notificationService';
import features from '../config';

export const useAssignments = () => {
  const [data, setData] = useState<Assignment | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAssignments().then(setData);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !data || features.readOnly) return;
    const sourceId = result.source.droppableId as keyof Assignment['run'] | 'build' | 'free';
    const destId = result.destination.droppableId as keyof Assignment['run'] | 'build' | 'free';

    const sourceList =
      sourceId === 'build'
        ? [...data.build]
        : sourceId === 'free'
        ? [...data.free]
        : [...data.run[sourceId]];
    let destList =
      destId === 'build'
        ? [...data.build]
        : destId === 'free'
        ? [...data.free]
        : [...data.run[destId]];

    if (sourceId === destId) {
      destList = sourceList;
    }

    const [moved] = sourceList.splice(result.source.index, 1);
    destList.splice(result.destination.index, 0, moved);

    const newData: Assignment = {
      build:
        sourceId === 'build' ? sourceList : destId === 'build' ? destList : data.build,
      run: {
        anomalies:
          sourceId === 'anomalies'
            ? sourceList
            : destId === 'anomalies'
            ? destList
            : data.run.anomalies,
        service:
          sourceId === 'service'
            ? sourceList
            : destId === 'service'
            ? destList
            : data.run.service,
        fastTrack:
          sourceId === 'fastTrack'
            ? sourceList
            : destId === 'fastTrack'
            ? destList
            : data.run.fastTrack,
      },
      free:
        sourceId === 'free'
          ? sourceList
          : destId === 'free'
          ? destList
          : data.free,
    };
    setData(newData);
    saveAssignments(newData).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      sendNotification();
    });
  };

  const updateNote = (id: string, note?: string) => {
    if (!data || features.readOnly) return;
    const update = (list: Developer[]) =>
      list.map((dev) => (dev.id === id ? { ...dev, note } : dev));
    const newData: Assignment = {
      build: update(data.build),
      run: {
        anomalies: update(data.run.anomalies),
        service: update(data.run.service),
        fastTrack: update(data.run.fastTrack),
      },
      free: update(data.free),
    };
    setData(newData);
    saveAssignments(newData).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      sendNotification();
    });
  };

  const totalDevelopers =
    data
      ? data.build.length +
        data.run.anomalies.length +
        data.run.service.length +
        data.run.fastTrack.length +
        data.free.length
      : 0;

  return { data, saved, handleDragEnd, totalDevelopers, updateNote };
};
