import type { ColumnType } from 'antd/es/table';
import { Table } from 'antd';
import { useIntl } from '@umijs/max';
import { formatDateTime } from '@/utils';

interface IViewEntityChangeProps {
  propertyChanges: any[];
  summaryTitle?: string;
}

const renderValue = (v, type) => {
  if (v && type === 'System.DateTime') {
    return formatDateTime(v);
  }
  return v;
};

const EntityChangeTable: React.FC<IViewEntityChangeProps> = ({ propertyChanges, summaryTitle }) => {
  const intl = useIntl();
  const columns: ColumnType<any>[] = [
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::PropertyName' }),
      dataIndex: 'propertyName',
      width: 140,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::OriginalValue' }),
      dataIndex: 'originalValue',
      width: 160,
      ellipsis: true,
      render: (v, row) => renderValue(v, row.propertyTypeFullName),
    },
    {
      title: intl.formatMessage({ id: 'AbpAuditLogging::NewValue' }),
      dataIndex: 'newValue',
      width: 160,
      ellipsis: true,
      render: (v, row) => renderValue(v, row.propertyTypeFullName),
    },
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={propertyChanges}
      pagination={false}
      showHeader
      summary={() => {
        return summaryTitle ? (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>id</Table.Summary.Cell>
            <Table.Summary.Cell index={1} align="right" colSpan={2}>
              {summaryTitle}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        ) : null;
      }}
    />
  );
};

export default EntityChangeTable;
