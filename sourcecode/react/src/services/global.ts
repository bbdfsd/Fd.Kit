// import { request } from '@umijs/max'
import { omit } from 'lodash';
import { getAbpApplicationConfiguration } from '@/services/autogenerate/abpApplicationConfiguration';
import { postBasicManagementAccountLogin } from '@/services/autogenerate/account';
import { clearToken } from '@/utils/authority';
import { addTextsToLanguage } from '@/utils/localesEx';

export const postLogin = postBasicManagementAccountLogin;

export async function loginOut() {
  return await new Promise((resolve) => {
    clearToken();
    resolve(true);
  });
}

export async function getCurrentUser() {
  const {
    currentUser = {},
    currentTenant = {},
    auth = {},
    localization = {},
    setting = {},
  } = await getAbpApplicationConfiguration({
    IncludeLocalizationResources: true,
  });
  addTextsToLanguage(localization as FD.TAbpLocalization);

  const { grantedPolicies: permissions } = auth;
  if (!currentUser.id) {
    clearToken();
  }
  return {
    currentUser: {
      name: currentUser.userName,
      // avatar: currentUser.avatar,
      id: currentUser.id,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
      // organizationId: currentUser.organizationId,
      permissions,
      unreadCount: 0,
    },
    tenant: currentTenant,
    // settings: defaultSettings,
    serverSettings: setting?.values || {},
  };
}

/**
 * 根据 id 查询，没有id的情况返回一个空对象
 * @param service 执行查询的服务方法
 * @param id 主键 id
 * @returns  查询结果或者空对象
 */
export function getOrDefault<T = any>(
  service: (id) => Promise<T>,
  id?: string,
  defaultValue?: any,
): Promise<T> {
  if (id) {
    return service({ id });
  }
  return Promise.resolve(defaultValue || {});
}

/**
 * 根据 id 查询，没有id的情况返回一个空对象
 * @param service 执行查询的服务方法
 * @param id 主键 id
 * @returns  查询结果或者空对象
 */
export function getFormatedRequest(
  service: () => Promise<any>,
  valueKey: string = 'id',
  labelKey: string,
) {
  return service().then((result) => {
    return result?.items?.map((item) => {
      return {
        label: item[labelKey],
        value: item[valueKey],
      };
    });
  });
}

/**
 * 格式化带 items的请求
 * @param service
 * @returns Array<T>
 */
export function getFormatItemsRequest<T = any>(service: () => Promise<any>): Promise<T[]> {
  return service().then((result) => {
    return result.items;
  });
}

/**
 * pro table 请求之前对数据进行转换(keyword-->filter)
 * @param params 查询参数
 * @returns
 */
export function beforeFormatForProTable(params) {
  const filter = omit(params, 'keyword');
  return {
    filter: params?.keyword || undefined,
    ...filter,
  };
}
