export const runCols = ['anomalies', 'service', 'fastTrack'] as const;

export const titles: Record<string, string> = {
  build: '✅🛠️ Build',
  anomalies: 'Anomalies',
  service: 'Service',
  fastTrack: 'Fast Track',
  free: 'Libre',
};

export const columnClasses: Record<string, string> = {
  build: 'build-column',
  anomalies: 'anomalies-column',
  service: 'service-column',
  fastTrack: 'fastTrack-column',
  free: 'free-column',
};
