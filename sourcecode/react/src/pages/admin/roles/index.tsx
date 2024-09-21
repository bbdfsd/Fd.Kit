import type { ActionType, ProColumns } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Access, useAccess, useIntl, useSearchParams } from '@umijs/max';
import { getIdentityRoles, deleteIdentityRolesId } from '@/services/autogenerate/roles';
import FDPageContainer from '@/components/FdPageContainer';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';
import Permissions from '@/constants/permissions';
import PermissionManager from './components/PermissionManager';
import RoleEditDialog from './components/RoleEditDialog';

const OperationType = {
  Create: 'Create',
  Edit: 'Edit',
  Delete: 'Delete',
  ManagePermissions: 'ManagePermissions',
};

const Users: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id') as string;
  const type = searchParams.get('type') as string;

  const columns: ProColumns<API.IdentityRoleDto>[] = [
    {
      title: intl.formatMessage({ id: 'pages.label.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' }),
      dataIndex: 'name',
      search: {
        transform: (value) => {
          return {
            filter: value,
          };
        },
      },
      render: (dom, entity) => {
        return (
          <Space>
            {dom}
            {entity.isStatic && (
              <Tag color="processing">{intl.formatMessage({ id: 'pages.label.static' })}</Tag>
            )}
          </Space>
        );
      },
    },
    // {
    //   title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsPublic' }),
    //   dataIndex: 'isPublic',
    //   width: 80,
    //   render: (dom, row) => {
    //     return (
    //       <StatusTag
    //         status={row.isPublic}
    //         trueLabel={intl.formatMessage({ id: 'pages.label.yes' })}
    //         falseLabel={intl.formatMessage({ id: 'pages.label.no' })}
    //       />
    //     );
    //   },
    // },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsDefault' }),
      dataIndex: 'isDefault',
      width: 80,
      search: false,
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
      title: intl.formatMessage({ id: 'AbpIdentity::ModificationTime' }),
      dataIndex: 'lastModificationTime',
      valueType: 'date',
      width: 160,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.label.option' }),
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 160,
      render: (text, record) => {
        return [
          <Access
            key={OperationType.ManagePermissions}
            accessible={access[Permissions.AbpIdentity.Roles.managePermissions]}
          >
            <a onClick={() => handleManagePermission(record.name as string)}>
              {intl.formatMessage({ id: 'AbpIdentity::Permission:ChangePermissions' })}
            </a>
          </Access>,
          record.isStatic ? null : (
            <Access
              key={OperationType.Edit}
              accessible={access[Permissions.AbpIdentity.Roles.update]}
            >
              <a onClick={() => handleEdit(record.id)}>
                {intl.formatMessage({ id: 'pages.action.edit' })}
              </a>
            </Access>
          ),
          record.isStatic ? null : (
            <Access
              key={OperationType.Delete}
              accessible={access[Permissions.AbpIdentity.Roles.delete]}
            >
              <Popconfirm
                onConfirm={() => handleDelete(record.id as string)}
                title={intl.formatMessage({ id: 'pages.tip.delete' })}
              >
                <a className="link-remove">{intl.formatMessage({ id: 'pages.action.delete' })}</a>
              </Popconfirm>
            </Access>
          ),
        ];
      },
    },
  ];

  const handleManagePermission = async (id) => {
    setSearchParams({
      id,
      type: OperationType.ManagePermissions,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteIdentityRolesId({ id });
    actionRef.current?.reload();
  };

  const handleEdit = (id: string = '') => {
    setSearchParams({
      id,
      type: OperationType.Edit,
    });
  };

  const handleCreate = () => {
    setSearchParams({
      type: OperationType.Create,
    });
  };

  const handleCloseDialog = async (result) => {
    if (result) {
      actionRef.current?.reload();
    }
    setSearchParams({});
  };

  return (
    <FDPageContainer>
      <FdProTable<API.IdentityRoleDto, API.getIdentityRolesParams>
        actionRef={actionRef}
        request={getIdentityRoles}
        columns={columns}
        toolBarRender={() => [
          <Access
            key={OperationType.Create}
            accessible={access[Permissions.AbpIdentity.Users.create]}
          >
            <Button onClick={handleCreate} key="create" icon={<PlusOutlined />} type="primary">
              {intl.formatMessage({ id: 'pages.action.create' })}
            </Button>
          </Access>,
        ]}
      />
      {type === OperationType.Edit && <RoleEditDialog id={id} onClose={handleCloseDialog} />}
      {type === OperationType.Create && <RoleEditDialog onClose={handleCloseDialog} />}
      {type === OperationType.ManagePermissions && (
        <PermissionManager id={id} onClose={handleCloseDialog} />
      )}
    </FDPageContainer>
  );
};
export default Users;
