import { useRequest, useResponsive } from 'ahooks';
import { Drawer, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { getAuditLoggingAuditLogsEntityChangesEntityChangeId } from '@/services/autogenerate/auditLog';
import EntityChangeTable from '../components/EntityChangeTable';

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
  const { styles } = useStyles();
  const { data: model, loading } = useRequest<any, any>(
    () => {
      return getAuditLoggingAuditLogsEntityChangesEntityChangeId({ entityChangeId: id });
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
      title={model?.entityTypeFullName}
      onClose={handleClose}
      className={styles.page}
      open
      placement="right"
      width={800}
    >
      <Skeleton active loading={loading}>
        <EntityChangeTable
          propertyChanges={model?.propertyChanges}
          summaryTitle={model?.entityId}
        />
      </Skeleton>
    </Drawer>
  );
};

export default View;
