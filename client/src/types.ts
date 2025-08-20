export type Developer = {
  id: string;
  name: string;
  lead: string;
  note?: string;
};

export type Assignment = {
  build: Developer[];
  run: {
    anomalies: Developer[];
    service: Developer[];
    fastTrack: Developer[];
  };
  free: Developer[];
};
