import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useResponsive } from 'ahooks';
import { message, Table } from 'antd';
import { DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {
  getIdentityOrganizationUnitsIdAvailableUsers,
  putIdentityOrganizationUnitsIdMembers,
} from '@/services/autogenerate/organizationUnits';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';

interface MemberChoiceListProps {
  organizationId: string;
  onClose: (result: boolean) => void;
}

const MemberChoiceList: React.FC<MemberChoiceListProps> = ({ organizationId, onClose }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const actionRef = useRef<ActionType>();
  const [userIds, setUserIds] = useState<string[]>([]);

  const columns: ProColumns<API.IdentityUserDto>[] = [
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:UserName' }),
      dataIndex: 'userName',
      width: 120,
      search: false,
    },
    {
      title: `${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Surname' })}${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Name' })}`,
      dataIndex: 'Name',
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
  ];

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const handleSaveAddMembers = async () => {
    if (userIds.length === 0) {
      message.error(intl.formatMessage({ id: 'pages.tip.mustChoiceData' }));
      return;
    }
    await putIdentityOrganizationUnitsIdMembers(
      { id: organizationId },
      {
        userIds,
      },
    );
    actionRef.current?.clearSelected?.();
    onClose(true);
  };

  return (
    <DrawerForm
      width={responsive.lg ? 800 : '100%'}
      title={intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:SelectUsers' })}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={handleSaveAddMembers}
    >
      <FdProTable<API.IdentityUserDto>
        sticky={false}
        search={false}
        options={{
          search: {
            allowClear: true,
            name: 'filter',
            placeholder: intl.formatMessage({ id: 'pages.field.userSearch' }),
            style: { width: 280 },
          },
          reload: false,
          setting: false,
          density: false,
        }}
        toolBarRender={() => []}
        actionRef={actionRef}
        request={() =>
          getIdentityOrganizationUnitsIdAvailableUsers({
            id: organizationId,
          })
        }
        columns={columns}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (selectedRowKeys) => {
            setUserIds(selectedRowKeys as string[]);
          },
        }}
      />
    </DrawerForm>
  );
};

export default MemberChoiceList;
