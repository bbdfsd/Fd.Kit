import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { forEach, omit, reduce } from 'lodash';
import type { IntlShape } from 'react-intl';

/**
 * 检测指定路由是否在白名单
 * @param pathName 要检测的路由
 * @param whiteList 白名单列表
 */
export function checkInWhiteList(pathName: string, whiteList: (string | RegExp)[]): boolean {
  return whiteList.some((item) => {
    if (item instanceof RegExp) {
      return item.test(pathName);
    }
    return item === pathName;
  });
}

/**
 * 数字千分位
 * @param price  要格式化的数字
 * @returns 千分位的结果
 */
export function formatPrice(price: string | number | undefined | null, precision?: number): string {
  if (price === '' || typeof price === 'undefined' || price === null) {
    return '';
  }
  let value = `${price}`;
  if (typeof precision !== 'undefined') {
    value = numberToFixed(Number(price), precision);
  }
  const [digistValue, precisionValue] = value.split('.');
  const splitedDigist = digistValue.replace(/\B(?=(\d{3})+(?!\d)$)/g, ',');
  return precisionValue ? `${splitedDigist}.${precisionValue}` : splitedDigist;
}
/**
 * 将数值保留指定位数小数
 * @param realValue 要转换的数值
 * @param precision 保留的小数位数
 * @returns toFixed后的数值
 */
export function numberToFixed(realValue: number, precision: number = 2) {
  return precision >= 0 ? realValue.toFixed(precision) : `${realValue}`;
}

/**
 * 标准日期格式格式化YYYY-MM-DD
 * @param date
 * @returns
 */
export function formatDate(
  date: Date | string | null | undefined,
  format: string = DEFAULT_DATE_FORMAT,
) {
  return date ? dayjs(date).format(format) : '';
}

/**
 * 标准日期格式格式化YYYY-MM-DD HH:mm:ss
 * @param date
 * @returns
 */
export function formatDateTime(
  date: Date | string | null | undefined,
  format: string = DEFAULT_DATE_TIME_FORMAT,
) {
  return date ? dayjs(date).format(format) : '';
}

/**
 *
 * @param arrayBuff
 * @returns
 */
export function getBase64Format(buffer: ArrayBuffer, prefix: string = 'data:image/png;base64,') {
  if (buffer && buffer.byteLength > 0) {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return `${prefix}${base64}`;
  }
  return '';
}

/**
 * 将树结构转成对象结构
 * @param tree 要转换的树对象(非数组)
 * @param key 作为key的属性名
 * @param childrenProp 字节点属性名称
 * @returns Object
 */
export function treeToObject<T = any>(
  tree: T,
  key = 'id',
  childrenProp = 'childrens',
): Record<string, T> {
  let map: Record<string, T> = {};
  const dataKey = tree[key];
  const treeWithOutChildren = {
    ...tree,
    [childrenProp]: undefined,
  };
  map[dataKey] = treeWithOutChildren;
  const childrens = tree[childrenProp];
  if (childrens && childrens.length > 0) {
    map = childrens.reduce((mapItem, item) => {
      const tmpMap = treeToObject(item, key, childrenProp);
      return {
        ...mapItem,
        ...tmpMap,
      };
    }, map);
  }
  return map;
}

/**
 * 返回树的键值对对象
 * @param tree T|T[] 树对象
 * @param option 配置项
 * @param option.key string key 属性名
 * @param option.label string label 属性名
 * @param option.children string children 属性名
 * @returns Record<string,string>
 */
export function treeToKeyValue<T=any>(tree: T|T[]|undefined,option: { key: string,label: string,children: string}){
  const result=new Map();
  if(tree===undefined){
    return result;
  }
  if(Array.isArray(tree)){
    reduce(tree,(mapResult,treeItem)=>{
      const childrenMapResult=treeToKeyValue(treeItem,option);
      childrenMapResult.forEach((resultValue,resultKey)=>{
        mapResult.set(resultKey,resultValue);
      })
      return mapResult;
    },result)
  }
  else{
    result.set(tree[option.key],tree[option.label])
    const childrenTree=tree[option.children];
    if(childrenTree&&childrenTree.length>0){
      const childrenMapResult=treeToKeyValue(childrenTree,option);
      childrenMapResult.forEach((resultValue,resultKey)=>{
        result.set(resultKey,resultValue);
      })
    }
  }
  return result;
}

/**
 * 将数组转成对象结构
 * @param array 要转换的数组对象
 * @param key 作为key的属性名 默认为 value
 * @param valueConvert 值转换器，默认为对象 可以传入字符串，会使用对象中特定属性名的值作为值 默认为(item)=>item
 */
export function arrayToObject<T = any>(
  array: T[],
  key?: string,
  valueConvert?: string,
): Record<string, any>;
export function arrayToObject<T = any>(
  array: T[],
  key?: string,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  valueConvert?: (item: T) => any,
): Record<string, any>;
export function arrayToObject<T = any>(
  array: T[],
  key: string = 'value',
  valueConvert: string | ((item: T) => any) = (item: T) => item,
) {
  const result: Record<string, any> = {};
  array.forEach((item) => {
    const value = typeof valueConvert === 'function' ? valueConvert(item) : item[valueConvert];
    result[item[key]] = value;
  });

  return result;
}

/**
 * 将array转成tree格式
 * @param array 要转换的数组
 * @param option 配置项
 * @returns 返回tree数组，如果只要一棵树可以直接获取第一项
 */
export function arrayToTree<T = any>(
  array: T[],
  option?: {
    keyName?: string;
    childrenName?: string;
    parentName?: string;
  },
) {
  const defaultOptions = {
    keyName: 'id',
    childrenName: 'childrens',
    parentName: 'parentId',
  };
  const mergeOptions = { ...defaultOptions, ...option };
  const treeMap = arrayToObject(array, mergeOptions.keyName);
  const result: T[] = [];

  array.forEach((item) => {
    const parentId = item[mergeOptions.parentName];
    if (parentId !== null && parentId !== undefined && parentId !== '') {
      const parentNode = treeMap[parentId];
      if (!parentNode) {
        throw `not found ${parentId} in map`;
      }
      parentNode[mergeOptions.childrenName] = parentNode[mergeOptions.childrenName] || [];
      const siblings = parentNode[mergeOptions.childrenName];
      siblings.push(item);
    } else {
      result.push(treeMap[item[mergeOptions.keyName]]);
    }
  });

  return result;
}

/**
 * 获取本地化的字典(会以label作为本地化的key)
 * @param options
 * @param intl
 * @returns
 */
export function getLocaledOptions<T = string>(options: FD.TOption<T>[], intl: IntlShape) {
  return options.map((item) => {
    return {
      ...item,
      label: intl.formatMessage({ id: `${item.label}` }),
    };
  });
}

/**
 * 提交表单之前进行数据格式化处理
 * @param values 表单值
 * @param maps 映射处理
 * @returns 处理后的表单值
 * @example beforeSubmitMap({test:[1,2]},{maps:{test:[start,end]}})  ==> {start:1,end:2}
 */
export function beforeSubmitMap(
  values: Record<string, any>,
  maps: Record<string, [string, string]>,
): Record<string, any> {
  const mapFormValue: Record<string, any> = {};
  forEach(maps, (itemValues, key) => {
    const [first, second] = values?.[key] || [];
    mapFormValue[itemValues[0]] = first || undefined;
    mapFormValue[itemValues[1]] = second || undefined;
  });
  const newValues = omit(values, Object.keys(maps));
  return {
    ...newValues,
    ...mapFormValue,
  };
}

/**
 * 本地化 options
 * @param param0
 * @returns
 */
export function formatOptionsWithLocale({
  options,
  intl,
  namespace='Spec'
}: {
  options: {label: string,value: string|number}[],
  intl: IntlShape,
  namespace?: string
}){
  return options.map(item=>(
    {
      ...item,
      label:intl.formatMessage({id:`${namespace}::Option:${item.label}`})
    }
  ))
}
