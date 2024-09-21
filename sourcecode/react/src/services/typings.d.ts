declare namespace FD {
  export type TUser = {
    name: string;
    avatar: string;
    id: string;
    organizationId: string;
    email: string;
    unreadCount: number;
    phone: string;
    permissions: string[];
  };

  export type TTenant = {
    id?: string;
    name?: string;
    isAvailable?: boolean;
  };

  export type TGlobalState = {
    currentUser?: TUser;
    tenant?: TTenant;
    settings?: import('@ant-design/pro-layout').Settings;
    /**
     * 服务器端 setting
     */
    serverSettings?: Record<string, string>;
  };

  export type TAbpLanguage={
    cultureName: string;
    displayName: string;
    flagIcon: string;
    uiCultureName: string;
  }

  export type TAbpLocalization={
    defaultResourceName: string;
    languages: TAbpLanguage[];
    values: Record<string,TKeyValue<string>>
  }

  export declare type TWithFalse<T> = T | false;

  /**
   * Key value简写
   */
  export declare type TKeyValue<
    ValueType = any,
    KeyType extends string | boolean | number | symbol = string,
  > = Record<KeyType, ValueType>;

  /**
   * 加密类型
   */
  export declare enum CryptoType {
    /**
     * 传入加密
     */
    In = 1,
    /**
     * 传出加密
     */
    Out = 2,
    /**
     * 传入+传出 都加密
     */
    Both = 4,
  }

  type AxiosRequestConfig = import('axios').AxiosRequestConfig;

  export declare type TRequestOption<T = any> = AxiosRequestConfig<T> & {
    /**
     * 操作成功是否提示
     */
    successTip?: boolean;
    /**
     * 请求方式
     */
    method?: import('axios').Method;
    /**
     * 加密传输方式
     */
    // crypto?: Wetrial.CryptoType;
    /**
     * 请求的类型key(用于cancel请求)
     */
    requestKey?: string;
    /**
     * 是否忽略请求
     */
    ignoreCancel?: boolean;
    /**
     * 自定义异常处理，配置了则不会进行全局异常拦截
     */
    onError?: (err: any) => void;
    /**
     * 自定义格式化，用于部分api不符合标准的情况使用
     */
    formatResponse?: (data: any) => any;
  };

  export declare type TableListPagination = {
    total: number;
    pageSize: number;
    current: number;
  };

  export type TableListData<T> = {
    list: T[];
    pagination: Partial<TableListPagination>;
  };

  export type TableListParams = {
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };

  export type TOption<ValueType = string> = {
    label: string;
    value: ValueType;
  };

  // interface IOption<T> {
  //   key: Extract<keyof T, string>;
  //   value: T[Extract<keyof T, string>];
  // }

  type IDictionary<T> = Record<string, T>;
}
