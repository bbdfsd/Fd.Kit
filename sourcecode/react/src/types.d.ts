declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'numeral';
declare module 'mockjs';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare global {
  interface Window {
    publicPath: string;
    navigator: any;
  }
}
