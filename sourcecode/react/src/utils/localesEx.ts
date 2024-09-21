import { isObject, reduce } from 'lodash';
import antdEnUS from 'antd/es/locale/en_US';
import antdZhCN from 'antd/es/locale/zh_CN';
// import antdValidationMessageZhTW from '@/locales/zh-TW/antd';
import { getLocale, addLocale } from '@umijs/max';
import antdValidationMessageEnUS from '@/locales/en-US/validation';
import menuMessage from '@/locales/zh-CN/menu';
import antdValidationMessageZhCN from '@/locales/zh-CN/validation';

/**
 * 前端本地化资源映射对象
 */
export const localeInfo: Record<string, any> = {
  'en-US': {
    validationMessages: {
      ...antdValidationMessageEnUS,
    },
    locale: 'en-US',
    antd: {
      ...antdEnUS,
    },
    momentLocale: '',
  },
  'zh-CN': {
    validationMessages: {
      ...antdValidationMessageZhCN,
    },
    locale: 'zh-CN',
    antd: {
      ...antdZhCN,
    },
    momentLocale: 'zh-cn',
  },
};

const SERVER_LOCAL_MAP = {
  'zh-CN': 'zh-Hans',
  'en-US': 'en',
};

/**
 * 获取 web 端使用的语言 code(比如 后端为 zh-hant 而前端 为 zh-TW)
 * @returns string
 */
export const getWebLanguage = (): string => {
  const language = getLocale();
  return SERVER_LOCAL_MAP[language] || 'zh-Hans';
};

function recursionValues(values: Record<string, any>, parentKey: string = '') {
  const result = reduce(
    values,
    (mapResult, value, key) => {
      const currentKey = parentKey ? `${parentKey}::${key}` : key;
      if (isObject(value)) {
        const subMap = recursionValues(value, currentKey);
        subMap.forEach((subValue, subKey) => {
          mapResult.set(subKey, subValue);
        });
      } else {
        mapResult.set(currentKey, value);
      }
      return mapResult;
    },
    new Map(),
  );
  return result;
}

/**
 * 设置 本地化字符串集合(设置成扁平化的key value 形式)
 * @param locales
 */
export const addTextsToLanguage = (localization: FD.TAbpLocalization) => {
  const serverTextMap = recursionValues(localization.values);
  const language = getLocale();
  const languageLocaleInfo = localeInfo[language];

  const messages = Object.fromEntries(serverTextMap);
  // // 设置菜单本地化
  // for (const menuKey in menuMessage) {
  //   const serverKey=menuMessage[menuKey];
  //   messages[menuKey]=messages[serverKey]
  // }

  addLocale(language, messages, {
    antd: languageLocaleInfo.antd,
    momentLocale: languageLocaleInfo.momentLocale,
  });
};
