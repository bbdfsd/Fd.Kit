import { useRequest, useResponsive } from 'ahooks';
import { Drawer, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { useIntl } from '@umijs/max';
import { getAuditLoggingAuditLogsId } from '@/services/autogenerate/auditLog';
import ViewEntityChange from './components/ViewEntityChange';
import ViewLogInfo from './components/ViewLogInfo';
import ViewOperator from './components/ViewOperator';

const { TabPane } = Tabs;

interface IViewProps {
  id: string;
  onClose: (result: boolean) => void;
}

const useStyles = createStyles(({ token }) => {
  return {
    page: {
      ':global': {
        '.ant-form-item': {
          marginBottom: 0,
          padding: '4px 0',
          borderBottom: `1px solid ${token.colorBorder}`,
        },
        '.ant-form-text': {
          wordBreak: 'break-all',
        },
        '.ant-drawer-body': {
          padding: 'padding: 0 8px 0 16px',
        },
      },
    },
  };
});

const View: React.FC<IViewProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  const { data: model = {}, loading } = useRequest(
    () => {
      return getAuditLoggingAuditLogsId({ id });
    },
    {
      refreshDeps: [id],
    },
  );

  const handleClose = () => {
    onClose(true);
  };

  return (
    <Drawer
      title={intl.formatMessage({ id: 'AbpAuditLogging::ChangeDetails' })}
      onClose={handleClose}
      className={styles.page}
      open
      placement="right"
      width={800}
      loading={loading}
    >
      <Tabs defaultActiveKey="total">
        <TabPane tab={intl.formatMessage({ id: 'AbpAuditLogging::Overall' })} key="total">
          <ViewLogInfo model={model} />
        </TabPane>
        {model.actions && model.actions.length > 0 ? (
          <TabPane
            tab={`${intl.formatMessage({ id: 'pages.label.option' })}(${model.actions.length})`}
            key="operators"
          >
            <ViewOperator actions={model.actions} />
          </TabPane>
        ) : null}
        {model.entityChanges && model.entityChanges.length > 0 ? (
          <TabPane
            tab={`${intl.formatMessage({ id: 'AbpAuditLogging::EntityChanges' })}(${
              model.entityChanges.length
            })`}
            key="changes"
          >
            <ViewEntityChange entityChanges={model.entityChanges} />
          </TabPane>
        ) : null}
      </Tabs>
    </Drawer>
  );
};

export default View;
