import ReactJson from 'react-json-view';
import { Form, Tag } from 'antd';
import { useIntl } from '@umijs/max';
import { formatDateTime } from '@/utils';
import { HTTP_METHOD_COLOR_MAP, HTTP_STATUS_CODE_COLOR_MAP } from '../constants';

interface IViewLogInfoProps {
  model: any;
}

const ViewLogInfo: React.FC<IViewLogInfoProps> = ({ model }) => {
  const intl = useIntl();
  return (
    <Form colon={false} labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::HttpStatusCode' })}>
        <Tag
          className="ant-form-text"
          color={HTTP_STATUS_CODE_COLOR_MAP[model.httpStatusCode] || 'default'}
        >
          {model.httpStatusCode}
        </Tag>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::MethodName' })}>
        <Tag className="ant-form-text" color={HTTP_METHOD_COLOR_MAP[model.httpMethod]}>
          {model.httpMethod}
        </Tag>
      </Form.Item>
      <Form.Item label="Url">
        <span className="ant-form-text">{model.url}</span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ClientIpAddress' })}>
        <span className="ant-form-text">{model.clientIpAddress}</span>
      </Form.Item>
      {/* <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging.ClientName' })}>
        <span className="ant-form-text">{model.clientName}</span>
      </Form.Item> */}
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::Exceptions' })}>
        <span className="ant-form-text">
          {model.exceptions && (
            <ReactJson
              displayDataTypes={false}
              indentWidth={2}
              enableClipboard={false}
              src={JSON.parse(model.exceptions)}
            />
          )}
        </span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::User' })}>
        <span className="ant-form-text">{model.userName}</span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ExecutionTime' })}>
        <span className="ant-form-text">{formatDateTime(model.executionTime)}</span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::ExecutionDuration' })}>
        <span className="ant-form-text">
          {model.executionDuration}{' '}
          {intl.formatMessage({ id: 'AbpAuditLogging::{0}Milliseconds' }, { '0': '' })}
        </span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::BrowserInfo' })}>
        <span className="ant-form-text">{model.browserInfo}</span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::CorrelationId' })}>
        <span className="ant-form-text">{model.correlationId}</span>
      </Form.Item>
      <Form.Item label={intl.formatMessage({ id: 'AbpAuditLogging::Comments' })}>
        <span className="ant-form-text">{model.comments}</span>
      </Form.Item>
    </Form>
  );
};

export default ViewLogInfo;
