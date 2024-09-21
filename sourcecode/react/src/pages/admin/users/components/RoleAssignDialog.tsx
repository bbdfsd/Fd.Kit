import { useRequest } from 'ahooks';
import React from 'react';
import { flatten, reduce } from 'lodash';
import { Form, Tag } from 'antd';
import { CheckCard, DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { getIdentityRolesAll } from '@/services/autogenerate/roles';
import {
  putIdentityUsersId,
  getIdentityUsersId,
  getIdentityUsersIdOrganizationUnits,
} from '@/services/autogenerate/users';

interface IManagePermissionProps {
  id: string;
  onClose: (result: boolean) => void;
}

const ManagePermission: React.FC<IManagePermissionProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const allRoleRequest = useRequest(getIdentityRolesAll, {
    refreshDeps: [],
  });
  const userRequest = useRequest(() => getIdentityUsersId({ id }), {
    refreshDeps: [id],
    onSuccess: (formData) => {
      form.setFieldsValue(formData);
    },
  });

  const { data: groupRoleIdMap = {} } = useRequest(
    async () => {
      const organizationUnits = await getIdentityUsersIdOrganizationUnits({ id });
      const organizations: API.OrganizationUnitDto[] = flatten(
        organizationUnits?.map((item) => item.roles),
      );
      const result = reduce(
        organizations,
        (mapResult, organization) => {
          mapResult[organization['roleId']] = true;
          return mapResult;
        },
        {},
      );
      return result;
    },
    {
      refreshDeps: [id],
    },
  );

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const saveForm = async (formData) => {
    await putIdentityUsersId(
      { id },
      {
        ...userRequest.data,
        ...formData,
      },
    );
  };

  return (
    <DrawerForm
      drawerProps={{
        maskClosable: false,
        loading: userRequest.loading,
      }}
      form={form}
      width={600}
      title={intl.formatMessage({
        id: 'pages.title.roleAssign',
      })}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={async (formData) => {
        await saveForm(formData);
        onClose(true);
      }}
      labelWrap
      grid
      layout="horizontal"
    >
      <Form.Item name="roleNames">
        <CheckCard.Group multiple>
          {allRoleRequest?.data?.items?.map((item) => {
            const itemId = item?.id ?? '';
            return (
              <CheckCard
                size="small"
                disabled={groupRoleIdMap[itemId]}
                key={item.name}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8, marginLeft: 8 }}>{item.name}</span>
                    {item.isDefault && (
                      <Tag color="blue">{intl.formatMessage({ id: 'pages.label.default' })}</Tag>
                    )}
                    {groupRoleIdMap[itemId] && (
                      <Tag color="geekblue">{intl.formatMessage({ id: 'pages.label.group' })}</Tag>
                    )}
                  </div>
                }
                value={item.name}
              />
            );
          })}
        </CheckCard.Group>
      </Form.Item>
    </DrawerForm>
  );
};

export default ManagePermission;
