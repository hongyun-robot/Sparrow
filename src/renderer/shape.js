/**
 * shape
 * n. 形状; 外形; 样子; 呈…形状的事物; 模糊的影子; 状况; 情况;
 * v. 使成为…形状(或样子); 塑造; 决定…的形成; 影响…的发展; 准备(做某动作); 摆好姿势;
 */

import { applyAttributes, createSVGElement, mount } from './utils';

export function shape(type, context, attributes) {
  // 获取被挂载的元素
  const { group } = context;
  // 创建对应的元素
  const el = createSVGElement(type);
  // 设置属性
  applyAttributes(el, attributes);

  // 挂载元素
  mount(group, el);
  return el;
}

// 绘制线
export function line(context, attributes) {
  return shape('line', context, attributes);
}

// 绘制方形
export function rect(context, attributes) {
  const {
    width, height, x, y,
  } = attributes;

  /**
   * rect 元素不支持 width，height 是负数，下面这种情况绘制不出来
   * <rect width="-60" height="-60" x="100" y="100" />
   * 为了支持负数的 width 和 height，需要转换成如下格式
   * <rect width="60" height="60" x="40" y="40" />
   */
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

// 绘制圆形
export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

// 绘制文字标签
export function text(context, attributes) {
  /**
   * text 元素是将展示的文字放在标签内部，而不是作为标签的属性
   * <text text="content" /> ❌
   * <text>content</text> 的 ✔
   */
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  // 通过 textContent 设置标签内的内容
  textElement.textContent = text;
  return textElement;
}

// 绘制路径标签
export function path(context, attributes) {
  const { d } = attributes;
  /**
   * path 的 d 属性是一个字符串，拼接起来比较麻烦，这里通过二维数组去生成
   * [
   *  ['M', 10, 10],
   *  ['L', 100, 100],
   *  ['Z']
   * ]
   * 上面的二维数组会被转换为如下字符串
   * 'M 10 10 L 100 100 L 100 100 Z'
   */
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}

// 绘制圆环
export function ring(context, attributes) {
  /**
   * 圆环由3个背景颜色为透明的圆组成
   * 两个圆边框模拟圆环的内外边框
   * 一个圆边框模拟圆环的本身
   */
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
