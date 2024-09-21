import type { ProColumns } from '@ant-design/pro-components';
import { useMemo, useState } from 'react';
import { DatePicker, Slider, Tag, Tooltip } from 'antd';
import { useIntl } from '@umijs/max';
import { getAuditLoggingAuditLogs } from '@/services/autogenerate/auditLog';
import { beforeSubmitMap, getLocaledOptions } from '@/utils';
import FdProTable from '@/components/FdProTable';
import { YES_NO_OPTIONS } from '@/constants/options';
import {
  HTTP_METHOD_COLOR_MAP,
  HTTP_METHOD_DICT,
  HTTP_STATUS_CODE_COLOR_MAP,
  HTTP_STATUS_CODE_DICT,
} from './constants';
import View from './view';

const beforeSearchSutmit = (values) => {
  const newValues = beforeSubmitMap(values, {
    executionTime: ['startTime', 'endTime'],
    executionDuration: ['minExecutionDuration', 'maxExecutionDuration'],
  });
  // 持续时间秒转毫秒
  if (newValues?.minExecutionDuration) {
    newValues.minExecutionDuration = Number(newValues.minExecutionDuration) * 1000;
  }
  if (newValues?.maxExecutionDuration) {
    newValues.maxExecutionDuration = Number(newValues.maxExecutionDuration) * 1000;
  }
  return newValues;
};

const Audit: React.FC = () => {
  const intl = useIntl();
  const [id, setId] = useState<string | false>();

  const handleView = (viewId) => {
    setId(viewId);
  };

  const handleClose = () => {
    setId(false);
  };

  const yesNoOptions = useMemo(() => {
    return getLocaledOptions(YES_NO_OPTIONS, intl);
  }, [intl]);

  const columns: ProColumns[] = [
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::Url' }),
      hideInTable: true,
      dataIndex: 'url',
      order: 90,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::HasException' }),
      hideInTable: true,
      dataIndex: 'hasException',
      valueType: 'select',
      fieldProps: {
        allowClear: true,
        options: yesNoOptions,
      },
      order: 20,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::MethodName' }),
      hideInTable: true,
      dataIndex: 'httpMethod',
      valueType: 'select',
      fieldProps: {
        allowClear: true,
        options: HTTP_METHOD_DICT,
      },
      order: 60,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::HttpStatusCode' }),
      hideInTable: true,
      dataIndex: 'httpStatusCode',
      valueType: 'select',
      fieldProps: {
        allowClear: true,
        options: HTTP_STATUS_CODE_DICT.map((item) => {
          return {
            ...item,
            label: intl.formatMessage({ id: `network.status.${item.value}` }),
          };
        }),
      },
      order: 50,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::HttpRequest' }),
      dataIndex: 'httpRequest',
      width: 400,
      ellipsis: true,
      search: false,
      render: (value, row) => {
        const httpStatusCode = row.httpStatusCode || '';
        return (
          <>
            <Tag color={HTTP_STATUS_CODE_COLOR_MAP[httpStatusCode] || 'default'}>
              {httpStatusCode}
            </Tag>
            <Tag color={HTTP_METHOD_COLOR_MAP[row.httpMethod]}>{row.httpMethod}</Tag>
            <Tooltip title={row.url}>
              <span>{row.url}</span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::User' }),
      dataIndex: 'userName',
      order: 100,
      width: 130,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::CorrelationId' }),
      dataIndex: 'correlationId',
      width: 280,
      ellipsis: true,
      copyable: true,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::ClientIpAddress' }),
      dataIndex: 'clientIpAddress',
      copyable: true,
      width: 135,
      order: 40,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::BrowserInfo' }),
      dataIndex: 'browserInfo',

      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::ExecutionTime' }),
      dataIndex: 'executionTime',
      width: 160,
      valueType: 'dateTime',
      order: 110,
      sorter: true,
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
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::ExecutionDuration' }),
      dataIndex: 'executionDuration',
      width: 140,
      valueType: 'digit',
      align: 'right',
      order: 70,
      sorter: true,
      renderFormItem: () => {
        return (
          <Slider
            step={1}
            tooltip={{ formatter: (v) => `${v}s` }}
            range={{ draggableTrack: true }}
          />
        );
      },
      render: (dom) => {
        return (
          <>
            {dom}
            {intl.formatMessage({ id: 'AbpAuditLogging::{0}Milliseconds' }, { '0': '' })}
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.label.option' }),
      dataIndex: 'operator',
      valueType: 'option',
      width: 70,
      fixed: 'right',
      render: (_, row) => [
        <a
          key="view"
          onClick={() => {
            handleView(row.id);
          }}
        >
          {intl.formatMessage({ id: 'pages.action.detail' })}
        </a>,
      ],
    },
  ];

  return (
    <>
      <FdProTable
        search={{
          labelWidth: 120,
        }}
        beforeSearchSubmit={beforeSearchSutmit}
        request={getAuditLoggingAuditLogs}
        columns={columns}
      />
      {id && <View onClose={handleClose} id={id} />}
    </>
  );
};

export default Audit;
