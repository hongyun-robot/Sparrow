import { equal } from './utils';

export function createOrdinal({
  domain,
  range,
}) {
  return (x) => {
    const index = domain.findIndex((d) => equal(d, x));
    // 防止 domain.length > range.length 的情况
    return range[index % range.length];
  }
}
