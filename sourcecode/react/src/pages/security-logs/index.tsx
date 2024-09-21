import type { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { DatePicker } from 'antd';
import { useIntl } from '@umijs/max';
import { getIdentitySecurityLogs } from '@/services/autogenerate/identitySecurityLogs';
import FDPageContainer from '@/components/FdPageContainer';
import FdProTable from '@/components/FdProTable';

const Users: React.FC = () => {
  const intl = useIntl();
  const columns: ProColumns<API.IdentitySecurityLogDto>[] = [
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::Time' }),
      dataIndex: 'creationTime',
      valueType: 'dateTime',
      width: 160,
      renderFormItem: () => {
        return (
          <DatePicker.RangePicker
            showTime
            placeholder={[
              intl.formatMessage({ id: 'AbpAuditLogging::StartDate' }),
              intl.formatMessage({ id: 'AbpAuditLogging::EndDate' }),
            ]}
          />
        );
      },
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::UserName' }),
      dataIndex: 'userName',
      width: 160,
    },
    // {
    //   title: intl.formatMessage({ id: '' }),
    //   dataIndex: 'identity',
    //   width: 160,
    // },
    // {
    //   title: intl.formatMessage({ id: 'AbpAuditLogging::ApplicationName' }),
    //   dataIndex: 'applicationName',
    //   width: 160,
    // },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::IpAddress' }),
      dataIndex: 'ipAddress',
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::CorrelationId' }),
      dataIndex: 'correlationId',
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::Url' }),
      dataIndex: 'action',
      search: {
        transform: (value) => {
          return {
            requestUrl: value,
          };
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::BrowserInfo' }),
      dataIndex: 'browserInfo',
    },
  ];
  return (
    <FDPageContainer>
      <FdProTable<API.IdentitySecurityLogDto, API.getIdentitySecurityLogsParams>
        request={getIdentitySecurityLogs}
        columns={columns}
      />
    </FDPageContainer>
  );
};
export default Users;
