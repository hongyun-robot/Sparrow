function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}

/**
 * 平移变换
 *
 * const map = translate(10, 10);
 * map([0, 0]); // [10, 10]
 * map([2, 3]); // [12, 13]
 * map.type(); // 'translate'
 *
 * @param tx
 * @param ty
 * @returns {*}
 */
export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

/**
 * 缩放变换
 *
 * const map = scale(10, 10);
 * map([0, 0]); // [0, 0]
 * map([2, 3]); // [20, 30]
 * map.type(); // 'scale'
 *
 * @param sx
 * @param sy
 * @returns {*}
 */
export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

/**
 * 反射变换，一种特殊缩放变换，两个维度缩放比例都是 -1，相当于符号互换 以原点反射
 *
 * const map = reflect();
 * map([1, 2]); // [-1, -2]
 * map([-2, 3]); // [2, -3]
 * map.type(); // 'reflect'
 *
 * @returns {*}
 */
export function reflect() {
  return transform('reflect', scale(-1, -1))
}

/**
 * 仅以x轴反射
 * @returns {*}
 */
export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

/**
 * 仅以y轴进行反射
 * @returns {*}
 */
export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

/**
 * 转置，交换一个点两个维度，按照 y = x 这条线进行对称
 *
 * const map = transpose();
 * map([1, 2]); // [2, 1]
 * map([-2, 3]); // [3, -2]
 * map.type(); // 'transpose'
 * @returns {*}
 */
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

/**
 * 极坐标 将极坐标系点转为笛卡尔坐标系
 *
 * theta 点和极点的连线和极轴的角度
 * radius 点到极点距离
 *
 * 极坐标系坐标 (radius, theta)
 * x = radius * cos(theta)
 * y = radius * sin(theta)
 *
 * @returns {*}
 */
export function polar() {
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y]
  })
}
