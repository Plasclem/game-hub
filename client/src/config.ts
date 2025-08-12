export interface FeatureConfig {
  readOnly: boolean; // TODO : use this to disable saving assignments
  dragAndDrop: boolean;
}

function getCookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))?.split('=')[1];
}

const dragCookie = getCookie('x-drag');

export const features: FeatureConfig = {
  readOnly: false,
  dragAndDrop: dragCookie ? dragCookie === 'true' : false,
};

export default features;
