export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}
