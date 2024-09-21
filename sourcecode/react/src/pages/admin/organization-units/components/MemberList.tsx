import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { Button, Empty, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Access, useAccess, useIntl } from '@umijs/max';
import {
  deleteIdentityOrganizationUnitsIdMembersUserId,
  getIdentityOrganizationUnitsIdMembers,
} from '@/services/autogenerate/organizationUnits';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';
import Permissions from '@/constants/permissions';
import MemberChoiceList from './MemberChoiceList';

export type MemberListProps = {
  organizationId: string;
};

const MemberList: React.FC<MemberListProps> = ({ organizationId }) => {
  const access = useAccess();
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const [opType, setOpType] = useState<'member' | 'role' | false>(false);

  const columns: ProColumns<API.IdentityUserDto>[] = [
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:UserName' }),
      dataIndex: 'userName',
      width: 120,
      search: false,
    },
    {
      title: `${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Surname' })}${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Name' })}`,
      dataIndex: 'fullname',
      width: 120,
      search: false,
      renderText: (text, record) => {
        return (record?.surname || '') + (record?.name || '');
      },
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:Email' }),
      dataIndex: 'email',
      search: false,
      width: 120,
    },
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:PhoneNumber' }),
      dataIndex: 'phoneNumber',
      search: false,
      width: 120,
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
      title: intl.formatMessage({ id: 'pages.label.option' }),
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 60,
      render: (text, record) => {
        return [
          <Access
            key="editable"
            accessible={access[Permissions.AbpIdentity.OrganizationUnits.manageMembers]}
          >
            <Popconfirm
              onConfirm={() => handleRemoveMember(record.id as string)}
              title={intl.formatMessage(
                { id: 'BasicManagement::OrganizationUnit:RemoveUserFromOuWarningMessage' },
                { 0: record.userName, 1: '' },
              )}
            >
              <a className="link-remove">{intl.formatMessage({ id: 'BasicManagement::Delete' })}</a>
            </Popconfirm>
          </Access>,
        ];
      },
    },
  ];

  const handleRemoveMember = async (id: string) => {
    await deleteIdentityOrganizationUnitsIdMembersUserId({
      id: organizationId,
      userId: id,
    });
    actionRef.current?.reload();
  };

  const handleAddMember = () => {
    setOpType('member');
  };

  const handleAddMemberCloase = async (result) => {
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
          request={getIdentityOrganizationUnitsIdMembers}
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
              accessible={access[Permissions.AbpIdentity.OrganizationUnits.manageMembers]}
            >
              <Button onClick={handleAddMember} key="create" icon={<PlusOutlined />} type="primary">
                {intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:AddMember' })}
              </Button>
            </Access>,
          ]}
        />
      ) : (
        <Empty
          description={intl.formatMessage({
            id: 'BasicManagement::OrganizationUnit:SelectAnOrganizationUnitToSeeMembers',
          })}
        />
      )}
      {opType === 'member' && (
        <MemberChoiceList organizationId={organizationId} onClose={handleAddMemberCloase} />
      )}
    </>
  );
};

export default MemberList;
