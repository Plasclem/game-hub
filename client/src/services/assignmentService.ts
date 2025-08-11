import axios from 'axios';
import { Assignment } from '../types';

export const getAssignments = async (): Promise<Assignment> => {
  const res = await axios.get<Assignment>('/affectations');
  return res.data;
};

export const saveAssignments = async (data: Assignment): Promise<void> => {
  await axios.post('/affectations', data);
};
