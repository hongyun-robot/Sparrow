import { normalize } from './utils';
import { interpolateNumber } from './interpolate'

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  return (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };
}

const scale = createLinear({
  domain: [0, 1],
  range: [
    [255, 255, 255],
    [0, 255, 255],
  ],
  interpolate: interpolateColor,
});

function interpolateColor(t, start, stop) {
  const r = interpolateNumber(t, start[0], stop[0]);
  const g = interpolateNumber(t, start[1], stop[1]);
  const b = interpolateNumber(t, start[2], stop[2]);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(scale);
