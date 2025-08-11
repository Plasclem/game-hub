let eventSource: EventSource | null = null;
const clientId = Math.random().toString(36).slice(2);

const getEventSource = () => {
  if (!eventSource) {
    eventSource = new EventSource(`/events?id=${clientId}`);
  }
  return eventSource;
};

export const sendNotification = () => {
  fetch(`/notify?id=${clientId}`, { method: 'POST' });
};

export const subscribeNotifications = (onMessage: () => void) => {
  const es = getEventSource();
  const handler = () => onMessage();
  es.addEventListener('message', handler);
  return () => es.removeEventListener('message', handler);
};
