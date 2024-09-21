import { useRequest, useResponsive } from 'ahooks';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useMemo, useState } from 'react';
import { flatMap, reduce } from 'lodash';
import { Checkbox, Form, Tabs } from 'antd';
import { ProCard, DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {
  getPermissionManagementPermissions,
  putPermissionManagementPermissions,
} from '@/services/autogenerate/permissions';
import { arrayToTree, treeToKeyValue } from '@/utils';
import RoleGroup from './RoleGroup';

interface IPermissionManagerProps {
  // providerName: string;
  // providerKey: string;
  id: string;
  onClose: (result: boolean) => void;
}

const { TabPane } = Tabs;

const DisplayNameMap = {};

const providerName = 'R';

const PermissionManager: React.FC<IPermissionManagerProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [increaseKey, setIncreaseKey] = useState(0);

  const [currentGroup, setCurrentGroup] = React.useState<string>();
  const [formValues, setFormValues] = React.useState<string[]>();

  const [model, setModel] = React.useState<API.getPermissionManagementPermissionsParams>();

  const rolePermissionsRequest = useRequest<API.GetPermissionListResultDto, any>(
    () =>
      getPermissionManagementPermissions({
        providerName,
        providerKey: id,
      }),
    {
      refreshDeps: [id],
      manual: true,
      onSuccess: (rep) => {
        // TODO: 暂时移除其他未实现功能的权限
        rep.groups = rep.groups?.filter(
          (group) =>
            [
              'FeatureManagement',
              // 'Saas',
              'OpenIddictPro',
              // 'SettingManagement',
              // 'TextTemplateManagement',
              // 'LanguageManagement',
            ].indexOf(group.name as string) === -1,
        );
        rep.groups?.forEach((group) => {
          group.permissions = arrayToTree(group.permissions || [], {
            keyName: 'name',
            childrenName: 'permissions',
            parentName: 'parentName',
          });
        });

        const filterPermissions = {
          'AbpIdentity.Roles': ['AuditLogging.ViewChangeHistory:Volo.Abp.Identity.IdentityRole'],
          'AbpIdentity.Users': [
            'AbpIdentity.Users.Update.ManageOU',
            'AuditLogging.ViewChangeHistory:Volo.Abp.Identity.IdentityUser',
            'AbpIdentity.Users.Impersonation',
            'AbpIdentity.Users.Import',
          ],
          'AbpIdentity.ClaimTypes': false,
          // 'AbpIdentity.SettingManagement': false,
          'AbpIdentity.SecurityLogs': false,
        };
        rep.groups = rep.groups?.map((group) => {
          if (group.displayNameKey === 'Permission:IdentityManagement') {
            const permissions: any[] = [];
            group.permissions?.forEach((permission) => {
              const filterDeclares = filterPermissions[permission?.name || ''];
              if (filterDeclares !== false) {
                if (Array.isArray(filterDeclares)) {
                  permissions.push({
                    ...permission,
                    permissions: permission['permissions']?.filter(
                      (item) => filterDeclares.indexOf(item.name) === -1,
                    ),
                  });
                } else {
                  permissions.push(permission);
                }
              }
            });

            group.permissions = permissions;
          }
          return group;
        });
        setModel(rep);
        const defaultFormData = getFormValueFromGroups(rep?.groups || []);
        setFormData(defaultFormData);

        setCurrentGroup(rep.groups?.[0]?.['name']);
        return {};
      },
    },
  );

  // 数据源组
  const treeMap = useMemo(
    () =>
      treeToKeyValue(
        model?.groups?.map((item) => item.permissions),
        { key: 'name', label: 'displayName', children: 'permissions' },
      ),
    [model],
  );

  const getFormValueFromGroups = (groups: API.PermissionGroupDto[]) => {
    const formData: Record<string, string[]> = {};
    reduce(
      groups,
      (result, groupItem) => {
        const groupMap = treeToKeyValue(groupItem.permissions, {
          key: 'name',
          label: 'isGranted',
          children: 'permissions',
        });
        const groupChecked: string[] = [...groupMap.keys()].filter((key) => groupMap.get(key));
        result[groupItem.name as string] = groupChecked;
        return result;
      },
      formData,
    );
    return formData;
  };

  // 设置表单值，同时更新state中暂存的表单值
  const setFormData = (formData) => {
    form.setFieldsValue(formData);
    setFormValues(formData as any);
  };

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const handleChangeGroup = (key) => {
    setCurrentGroup(key);
  };

  const handleChangeCheckAll = (e: CheckboxChangeEvent) => {
    const formData: Record<string, string[]> = {};
    reduce(
      model?.groups,
      (result, groupItem) => {
        let groupChecked: string[] = [];
        if (e.target.checked) {
          const groupMap = treeToKeyValue(groupItem.permissions, {
            key: 'name',
            label: 'displayName',
            children: 'permissions',
          });
          groupChecked = [...groupMap.keys()];
        }
        result[groupItem.name as string] = groupChecked;
        return result;
      },
      formData,
    );
    setFormData(formData as any);
    setIncreaseKey(increaseKey + 1);
  };

  const handleFormValuesChange = (changeValues) => {
    setFormValues({
      ...formValues,
      ...changeValues,
    });
  };

  const handleSave = async () => {
    // const formData=form.getFieldsValue();
    const formAllPermission = flatMap(formValues, (item) => item);
    const assignPermissions: API.UpdatePermissionDto[] = [];
    treeMap.forEach((_, key) => {
      assignPermissions.push({
        isGranted: formAllPermission.includes(key),
        name: key,
      });
    });
    await putPermissionManagementPermissions(
      {
        providerName,
        providerKey: id,
      },
      {
        permissions: assignPermissions,
      },
    );
    onClose(true);
  };

  // 全选、半选 按钮状态
  const [checkAll, indeterminate] = useMemo(() => {
    let isCheckAll: boolean = false;
    let isIndeterminate: boolean = false;
    if (treeMap.size > 0) {
      const allValueLength = reduce(
        formValues,
        (sum, curItem) => {
          return (curItem.length || 0) + sum;
        },
        0,
      );
      if (allValueLength === treeMap.size) {
        isCheckAll = true;
      } else if (allValueLength > 0) {
        isIndeterminate = true;
      }
    }
    return [isCheckAll, isIndeterminate];
  }, [formValues, treeMap]);

  return (
    <DrawerForm
      form={form}
      drawerProps={{
        maskClosable: false,
      }}
      width={600}
      title={`${intl.formatMessage({ id: 'AbpIdentity::Permission:ChangePermissions' })} - ${model?.entityDisplayName ?? ''}`}
      onOpenChange={handleChangeVisible}
      open={true}
      request={() => rolePermissionsRequest.refreshAsync()}
      onFinish={handleSave}
      labelWrap
      layout="horizontal"
      onValuesChange={handleFormValuesChange}
    >
      <ProCard
        size="small"
        title={
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={handleChangeCheckAll}
          >
            {intl.formatMessage({ id: 'AbpPermissionManagement::SelectAllInThisTab' })}
          </Checkbox>
        }
        headerBordered
      >
        <Tabs tabPosition="left" onChange={handleChangeGroup} activeKey={currentGroup}>
          {model?.groups?.map((group) => {
            return (
              <TabPane
                tab={`${DisplayNameMap[group.name ?? ''] || group.displayName} (${form.getFieldValue(group.name as string)?.length || 0})`}
                key={group.name}
              >
                <Form.Item name={group.name}>
                  <RoleGroup dataSource={group.permissions || []} />
                </Form.Item>
              </TabPane>
            );
          })}
        </Tabs>
      </ProCard>
    </DrawerForm>
  );
};

export default PermissionManager;
