import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Button, Empty, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Access, useAccess, useIntl } from '@umijs/max';
import {
  deleteIdentityOrganizationUnitsIdRolesRoleId,
  getIdentityOrganizationUnitsIdRoles,
} from '@/services/autogenerate/organizationUnits';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';
import Permissions from '@/constants/permissions';
import RoleChoiceList from './RoleChoiceList';

interface RoleListProps {
  organizationId: string;
}

const RoleList: React.FC<RoleListProps> = ({ organizationId }) => {
  const intl = useIntl();
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const [opType, setOpType] = useState<'member' | 'role' | false>(false);

  const columns: ProColumns<API.IdentityRoleDto>[] = [
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' }),
      dataIndex: 'name',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsDefault' }),
      dataIndex: 'isDefault',
      width: 80,
      render: (dom, row) => {
        return (
          <StatusTag
            status={row.isDefault}
            trueLabel={intl.formatMessage({ id: 'BasicManagement::Yes' })}
            falseLabel={intl.formatMessage({ id: 'BasicManagement::No' })}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.label.option' }),
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 60,
      render: (text, record) => {
        return [
          <Access
            key="editable"
            accessible={access[Permissions.AbpIdentity.OrganizationUnits.manageRoles]}
          >
            <Popconfirm
              onConfirm={() => handleRemoveRole(record.id as string)}
              title={intl.formatMessage(
                { id: 'BasicManagement::OrganizationUnit:RemoveRoleFromOuWarningMessage' },
                { 0: record.name, 1: '' },
              )}
            >
              <a className="link-remove">{intl.formatMessage({ id: 'BasicManagement::Delete' })}</a>
            </Popconfirm>
          </Access>,
        ];
      },
    },
  ];

  const handleRemoveRole = async (id: string) => {
    await deleteIdentityOrganizationUnitsIdRolesRoleId({
      id: organizationId,
      roleId: id,
    });
    actionRef.current?.reload();
  };

  const handleAddRoles = () => {
    setOpType('role');
  };

  const handleAddRolesCloase = async (result) => {
    setOpType(false);
    if (result) {
      actionRef.current?.reload();
    }
  };

  return (
    <>
      {organizationId ? (
        <FdProTable
          actionRef={actionRef}
          params={{
            id: organizationId,
          }}
          scroll={{
            x: 'max-content',
          }}
          request={getIdentityOrganizationUnitsIdRoles}
          columns={columns}
          options={{
            search: {
              allowClear: true,
              name: 'filter',
              style: { width: 280 },
            },
            reload: false,
            setting: false,
            density: false,
          }}
          search={false}
          toolBarRender={() => [
            <Access
              key="manage-member"
              accessible={access[Permissions.AbpIdentity.OrganizationUnits.manageRoles]}
            >
              <Button onClick={handleAddRoles} key="create" icon={<PlusOutlined />} type="primary">
                {intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:AddRole' })}
              </Button>
            </Access>,
          ]}
        />
      ) : (
        <Empty
          description={intl.formatMessage({
            id: 'BasicManagement::OrganizationUnit:SelectAnOrganizationUnitToSeeRoles',
          })}
        />
      )}
      {opType === 'role' && (
        <RoleChoiceList organizationId={organizationId} onClose={handleAddRolesCloase} />
      )}
    </>
  );
};

export default RoleList;
