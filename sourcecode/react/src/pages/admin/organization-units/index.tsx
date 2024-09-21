import type { ActionType } from '@ant-design/pro-components';
import type { OrganizationUnitTreeRef } from './components/OrganizationUnitTree';
import React from 'react';
import { useRef, useState } from 'react';
import { useResponsive } from 'ahooks';
import { Button } from 'antd';
import { createStyles } from 'antd-style';
import { ProCard } from '@ant-design/pro-components';
import { Access, useAccess, useIntl } from '@umijs/max';
import FDPageContainer from '@/components/FdPageContainer';
import Permissions from '@/constants/permissions';
import MemberList from './components/MemberList';
import OrganizationUnitEdit from './components/OrganizationUnitEdit';
import OrganizationUnitTree from './components/OrganizationUnitTree';
import RoleList from './components/RoleList';

const useStyles = createStyles(({ token }) => {
  return {
    pageCard: {
      color: 'red',
      '.ant-pro-card-body': {
        gap: `${token.paddingSM}px`,
        '.ant-pro-card-col': {
          overflowX: 'hidden',
        },
      },
    },
  };
});

const OrganizationUnits: React.FC = () => {
  const intl = useIntl();
  const treeRef = useRef<OrganizationUnitTreeRef>();
  const access = useAccess();
  const { styles } = useStyles();
  const responsive = useResponsive();
  const [selectedOrganization, setSelectedOrganization] = useState<string>();
  const [show, setShow] = useState(false);

  const handEditCallback = async (result) => {
    setShow(false);
    if (result) {
      treeRef?.current?.refresh();
    }
  };

  const handleCreate = () => {
    setShow(true);
  };

  return (
    <FDPageContainer>
      <ProCard
        className={styles.pageCard}
        bordered={false}
        ghost
        direction={responsive.lg ? 'row' : 'column'}
        gutter={12}
      >
        <ProCard
          title={intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:OrganizationTree' })}
          extra={
            <Access accessible={access[Permissions.AbpIdentity.OrganizationUnits.manageOu]}>
              <Button size="small" onClick={handleCreate} type="primary">
                {intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:AddRootUnit' })}
              </Button>
            </Access>
          }
          colSpan={{
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '30%',
          }}
        >
          <OrganizationUnitTree
            ref={treeRef}
            selectedKey={selectedOrganization}
            onSelect={setSelectedOrganization}
          />
        </ProCard>
        <ProCard
          bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
          colSpan={{
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '70%',
          }}
          tabs={{
            type: 'card',
            items: [
              {
                key: 'members',
                label: intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:Members' }),
                children: <MemberList organizationId={selectedOrganization as string} />,
              },
              {
                key: 'roles',
                label: intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:Roles' }),
                children: <RoleList organizationId={selectedOrganization as string} />,
              },
            ],
          }}
        />
      </ProCard>
      {show && <OrganizationUnitEdit onClose={handEditCallback} />}
    </FDPageContainer>
  );
};

export default OrganizationUnits;
