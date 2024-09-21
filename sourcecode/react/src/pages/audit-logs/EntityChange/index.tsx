import type { ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { useIntl } from '@umijs/max';
import { getAuditLoggingAuditLogsEntityChanges } from '@/services/autogenerate/auditLog';
import { arrayToObject, beforeSubmitMap, getLocaledOptions } from '@/utils';
import FdProTable from '@/components/FdProTable';
import { ENTITY_CHANGE_TYPE } from './constants';
import View from './view';

const EntityChangeTypeMap = arrayToObject(ENTITY_CHANGE_TYPE, 'value', 'label');

const beforeSearchSutmit = (values) => {
  const newValues = beforeSubmitMap(values, {
    changeTime: ['startTime', 'endTime'],
  });
  return newValues;
};

const List: React.FC = () => {
  const intl = useIntl();
  const [id, setId] = useState<string | false>();

  const handleView = (viewId) => {
    setId(viewId);
  };

  const handleClose = () => {
    setId(false);
  };

  // const yesNoOptions = useMemo(() => {
  //   return getLocaledOptions(YES_NO_OPTIONS, intl);
  // }, [intl]);

  const columns: ProColumns[] = [
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::ChangeTime' }),
      dataIndex: 'changeTime',
      width: 160,
      valueType: 'dateTime',
      sorter: true,
      renderFormItem: () => {
        return (
          // @ts-ignore
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
      title: intl.formatMessage({ id: 'AbpAuditLogging::ChangeType' }),
      dataIndex: 'changeType',
      width: 160,
      sorter: true,
      render: (value, row) => {
        return intl.formatMessage({ id: EntityChangeTypeMap[row.changeType] });
      },
      valueType: 'select',
      fieldProps: {
        options: getLocaledOptions(ENTITY_CHANGE_TYPE, intl),
      },
    },
    // {
    //   title: 'TenantId',
    //   dataIndex: 'entityTenantId',
    //   width: 180,
    // },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::EntityTypeFullName' }),
      dataIndex: 'entityTypeFullName',
      ellipsis: true,
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
        form={{
          labelWidth: 140,
        }}
        beforeSearchSubmit={beforeSearchSutmit}
        request={getAuditLoggingAuditLogsEntityChanges}
        columns={columns}
      />
      {id && <View onClose={handleClose} id={id} />}
    </>
  );
};

export default List;
