import type { ActionType, ProColumns } from '@ant-design/pro-components';
import React, { useCallback, useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableDropdown } from '@ant-design/pro-components';
import { Access, useAccess, useIntl, useSearchParams } from '@umijs/max';
import {
  getIdentityUsers,
  deleteIdentityUsersId,
  putIdentityUsersIdLock,
} from '@/services/autogenerate/users';
import FDPageContainer from '@/components/FdPageContainer';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';
import Permissions from '@/constants/permissions';
import PasswordResetDialog from './components/PasswordResetDialog';
import RoleAssignDialog from './components/RoleAssignDialog';
import UserEditDialog from './components/UserEditDialog';

const OperationType = {
  Create: 'Create',
  Edit: 'Edit',
  Delete: 'Delete',
  ResetPassword: 'ResetPassword',
  Disable: 'Disable',
  Enable: 'Enable',
  RoleAssign: 'RoleAssign',
};

const Users: React.FC = () => {
  const intl = useIntl();
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id') as string;
  const type = searchParams.get('type') as string;

  const columns: ProColumns<API.IdentityUserDto>[] = [
    {
      title: intl.formatMessage({ id: 'pages.field.keyword' }),
      hideInTable: true,
      dataIndex: 'filter',
      colSize: 2,
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.label.searchByNameOrEmail' }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.label.index' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:UserName' }),
      dataIndex: 'userName',
      width: 140,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' }),
      dataIndex: 'roleNames',
      width: 240,
      search: false,
      valueType: 'tags' as any,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:Email' }),
      dataIndex: 'email',
      search: false,
      width: 200,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:PhoneNumber' }),
      dataIndex: 'phoneNumber',
      search: false,
      width: 140,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsActive' }),
      dataIndex: 'isActive',
      search: false,
      width: 80,
      render: (dom, row) => {
        return <StatusTag status={row.isActive} />;
      },
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::CreationTime' }),
      dataIndex: 'creationTime',
      valueType: 'date',
      width: 130,
      search: false,
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
      width: 120,
      render: (text, record) => {
        const operationMenus: any[] = [];
        const notAdmin = record.userName !== 'admin';
        if (access[Permissions.AbpIdentity.Users.update]) {
          operationMenus.push({
            key: OperationType.ResetPassword,
            name: intl.formatMessage({ id: 'pages.action.resetPassword' }),
          });
        }
        if (access[Permissions.AbpIdentity.Users.update] && notAdmin) {
          if (record.isActive) {
            operationMenus.push({
              key: OperationType.Disable,
              name: intl.formatMessage({ id: 'pages.action.disable' }),
            });
          } else {
            operationMenus.push({
              key: OperationType.Enable,
              name: intl.formatMessage({ id: 'pages.action.enable' }),
            });
          }
        }
        if (access[Permissions.AbpIdentity.Users.delete] && notAdmin) {
          operationMenus.push({
            key: OperationType.Delete,
            name: intl.formatMessage({ id: 'pages.action.delete' }),
          });
        }
        return [
          <Access key="editable" accessible={access[Permissions.AbpIdentity.Users.update]}>
            <a onClick={() => handleEdit(record.id)}>
              {intl.formatMessage({ id: 'pages.action.edit' })}
            </a>
          </Access>,
          <Access
            key={OperationType.RoleAssign}
            accessible={access[Permissions.AbpIdentity.Users.managePermissions]}
          >
            <a onClick={() => handleManagePermission(record.id)}>
              {intl.formatMessage({ id: 'AbpIdentity::Permissions' })}
            </a>
          </Access>,
          <Access key="operation" accessible={operationMenus.length > 0}>
            <TableDropdown onSelect={(key) => handleOperate(key, record)} menus={operationMenus} />
          </Access>,
        ];
      },
    },
  ];

  const handleOperate = async (opType, row) => {
    if (opType === OperationType.Delete) {
      await handleDelete(row.id);
    } else if (opType === OperationType.Enable) {
      await putIdentityUsersIdLock({ id: row.id }, { locked: false });
    } else if (opType === OperationType.Disable) {
      await putIdentityUsersIdLock({ id: row.id }, { locked: true });
    } else if (opType === OperationType.ResetPassword) {
      setSearchParams({
        type: OperationType.ResetPassword,
        id: row.id,
      });
      return;
    }
    actionRef.current?.reload();
  };

  const handleManagePermission = async (id) => {
    setSearchParams({
      id,
      type: OperationType.RoleAssign,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteIdentityUsersId({ id });
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
      <FdProTable<API.IdentityUserDto, API.getIdentityUsersParams>
        actionRef={actionRef}
        request={getIdentityUsers}
        columns={columns}
        toolBarRender={() => [
          <Access key="create" accessible={access[Permissions.AbpIdentity.Users.create]}>
            <Button onClick={handleCreate} key="create" icon={<PlusOutlined />} type="primary">
              {intl.formatMessage({ id: 'pages.action.create' })}
            </Button>
          </Access>,
        ]}
      />
      {type === OperationType.Edit && <UserEditDialog id={id} onClose={handleCloseDialog} />}
      {type === OperationType.Create && <UserEditDialog onClose={handleCloseDialog} />}
      {type === OperationType.ResetPassword && (
        <PasswordResetDialog id={id} onClose={handleCloseDialog} />
      )}
      {type === OperationType.RoleAssign && (
        <RoleAssignDialog id={id} onClose={handleCloseDialog} />
      )}
    </FDPageContainer>
  );
};
export default Users;
