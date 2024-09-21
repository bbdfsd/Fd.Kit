import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useResponsive } from 'ahooks';
import { message, Table } from 'antd';
import { DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
// import { getFormatedRequest } from '@/services/global';
import {
  getIdentityOrganizationUnitsIdAvailableRoles,
  putIdentityOrganizationUnitsIdRoles,
} from '@/services/autogenerate/organizationUnits';
import FdProTable from '@/components/FdProTable';
import StatusTag from '@/components/StatusTag';

// import styles from './index.less';

interface RoleChoiceListProps {
  organizationId: string;
  onClose: (result: boolean) => void;
}

const RoleChoiceList: React.FC<RoleChoiceListProps> = ({ organizationId, onClose }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const actionRef = useRef<ActionType>();
  const [roleIds, setRoleIds] = useState<string[]>([]);

  const columns: ProColumns[] = [
    {
      title: intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' }),
      dataIndex: 'name',
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
  ];

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const handleSaveAddMembers = async () => {
    if (roleIds.length === 0) {
      message.error(intl.formatMessage({ id: 'pages.tip.mustChoiceData' }));
      return;
    }
    await putIdentityOrganizationUnitsIdRoles(
      { id: organizationId },
      {
        roleIds,
      },
    );
    actionRef.current?.clearSelected?.();
    onClose(true);
  };

  return (
    <DrawerForm
      width={responsive.lg ? 800 : '100%'}
      title={intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:SelectRoles' })}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={handleSaveAddMembers}
    >
      <FdProTable
        params={{
          id: organizationId,
        }}
        sticky={false}
        search={false}
        scroll={{
          x: 'max-content',
        }}
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
        toolBarRender={() => []}
        actionRef={actionRef}
        request={() =>
          getIdentityOrganizationUnitsIdAvailableRoles({
            id: organizationId,
          })
        }
        columns={columns}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (selectedRowKeys) => {
            setRoleIds(selectedRowKeys as string[]);
          },
        }}
      />
    </DrawerForm>
  );
};

export default RoleChoiceList;
