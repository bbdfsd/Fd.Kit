import { history } from '@umijs/max';
import { WHITELIST } from '@/constants/whitelist';

/**
 * 获取安全的重定向地址(重复跳转到登录)
 */
export const getSafeRedirectUrl = (url: string | null = '') => {
  if (url && WHITELIST.includes(url)) {
    return '/';
  }
  if (!url) {
    return '/';
  }
  return decodeURIComponent(url);
};

/**
 * 获取当前 url 的 string 形式
 */
export const getCurrentUrlString = () => {
  const { location } = history;
  const { pathname, search, hash } = location;
  return `${pathname}${search}${hash}`;
};
