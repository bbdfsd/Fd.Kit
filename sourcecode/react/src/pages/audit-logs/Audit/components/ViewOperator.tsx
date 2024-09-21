import ReactJson from 'react-json-view';
import { isEmpty } from 'lodash';
import { Collapse, Form } from 'antd';
import { useIntl } from '@umijs/max';
import { formatDateTime } from '@/utils';

interface IViewOperatorProps {
  actions: any[];
}

const { Panel } = Collapse;

const ViewOperator: React.FC<IViewOperatorProps> = ({ actions = [] }) => {
  const intl = useIntl();
  return (
    <Collapse accordion defaultActiveKey="0">
      {actions.map((item, index) => (
        <Panel header={`${item.serviceName}`} key={index}>
          <Form colon={false} labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ExecutionTime' })}>
              {formatDateTime(item.executionTime)}
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ExecutionDuration' })}>
              <span className="ant-form-text">
                {item.executionDuration}{' '}
                {intl.formatMessage({ id: 'AbpAuditLogging::{0}Milliseconds' }, { '0': '' })}
              </span>
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::Parameters' })}>
              <span className="ant-form-text">
                {item.parameters && (
                  <ReactJson
                    displayDataTypes={false}
                    indentWidth={2}
                    enableClipboard={false}
                    src={JSON.parse(item.parameters)}
                  />
                )}
              </span>
            </Form.Item>
            <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ExtraProperties' })}>
              <span className="ant-form-text">
                {isEmpty(item.extraProperties) ? null : item.extraProperties}
              </span>
            </Form.Item>
          </Form>
        </Panel>
      ))}
    </Collapse>
  );
};

export default ViewOperator;
