import { getInputAsText } from '../utils/common';

function getDataStreamBuffer() {
  return getInputAsText('06')
}

async function solve01() {
  const dsb = await getDataStreamBuffer();
  let markerFound = false;
  let markerIndex = 0;
  for (let i = 0; i < dsb.length; i++) {
    if (markerFound) break;
    const _set = new Set([dsb[i], dsb[i+1], dsb[i+2], dsb[i+3]]);
    if (_set.size === 4) {
      markerFound = true;
      markerIndex = i + 4;
    }
  }
  return markerIndex;
}

async function solve02() {}

export default {
  solve01,
  solve02
}
