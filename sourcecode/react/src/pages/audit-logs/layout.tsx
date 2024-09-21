import { history, useLocation, useIntl, Outlet } from '@umijs/max';
import FDPageContainer from '@/components/FdPageContainer';

const Layout: React.FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const tabList = [
    {
      key: '/audit-logs/audit',
      tab: intl.formatMessage({ id: 'AbpAuditLogging::AuditLogs' }),
    },
    {
      key: '/audit-logs/entity-change',
      tab: intl.formatMessage({ id: 'AbpAuditLogging::EntityChanges' }),
    },
  ];

  const handleChangeTab = (activePath) => {
    history.push(activePath);
  };
  return (
    <FDPageContainer
      fixedHeader
      tabList={tabList}
      tabActiveKey={location.pathname}
      onTabChange={handleChangeTab}
      tabProps={{
        centered: true,
      }}
    >
      <Outlet />
    </FDPageContainer>
  );
};
export default Layout;
