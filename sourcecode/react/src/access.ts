import Permissions from '@/constants/permissions';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: FD.TGlobalState = {}) {
  const { currentUser } = initialState;
  const allPermissions = {
    ...Permissions,
  };
  const permissions = dgFlatPermissions(allPermissions, currentUser?.permissions) as Record<
    string,
    boolean
  >;
  return permissions;
}

function dgFlatPermissions(
  allPermissions: FD.TKeyValue,
  curPermissions: FD.TKeyValue = {},
): FD.TKeyValue<string, boolean> {
  let result: FD.TKeyValue<string, boolean> = {};
  for (const key in allPermissions) {
    if (allPermissions.hasOwnProperty(key)) {
      const permission = allPermissions[key];
      if (typeof permission === 'string') {
        // 含有 '||' 符号的，算多个权限的或操作
        if (permission.indexOf('||') !== -1) {
          const multiplePermissions = permission.split('||');
          result[permission] = multiplePermissions.some(
            (permissionItem) => !!curPermissions[permissionItem],
          );
        } else {
          result[permission] = !!curPermissions[permission];
        }
      }
      // 如果是函数，则调用，并使用返回值作为是否有权限的判断
      else if (typeof permission === 'function') {
        result[permission] = permission(curPermissions);
      } else {
        const subResult = dgFlatPermissions(permission, curPermissions);
        result = {
          ...result,
          ...subResult,
        };
      }
    }
  }
  return result;
}
