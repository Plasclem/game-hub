import axios from 'axios';
import { Assignment } from '../types';

export const getSnapshotLabels = async (): Promise<string[]> => {
  const res = await axios.get<string[]>('/snapshots');
  return res.data;
};

export const getSnapshot = async (label: string): Promise<Assignment> => {
  const res = await axios.get<Assignment>(`/snapshots/${encodeURIComponent(label)}`);
  return res.data;
};

export const saveSnapshot = async (label: string, data: Assignment): Promise<void> => {
  await axios.post('/snapshots', { label, data });
};

export const deleteSnapshot = async (label: string): Promise<void> => {
  await axios.delete(`/snapshots/${encodeURIComponent(label)}`);
};
