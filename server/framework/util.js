/**
 * Created by eatong on 17-11-22.
 */
export function grabContent(str) {
  const reg = new RegExp('\<[^>]*\>\s*', 'g');
  return str.replace(reg, '').replace(/\n/g, '');
}
