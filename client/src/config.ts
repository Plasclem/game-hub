export interface FeatureConfig {
  readOnly: boolean; // TODO : use this to disable saving assignments
  dragAndDrop: boolean;
}

export const features: FeatureConfig = {
  readOnly: false,
  dragAndDrop: true,
};

export default features;
