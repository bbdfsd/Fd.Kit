import React, { useCallback, lazy, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import { LogoutOutlined, KeyOutlined } from '@ant-design/icons';
import { history, useModel, useIntl } from '@umijs/max';
import { loginOut } from '@/services/global';
import { LOGIN_PATH } from '@/constants/whitelist';
import HeaderDropdown from '../HeaderDropdown';

const ChangePassword = lazy(() => import('./ChangePassword'));

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.name}</span>;
};

const MenuKeys = {
  Logout: 'logout',
  ChangePassword: 'changePassword',
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { styles } = useStyles();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [passwordChangeModalVisible, setPasswordChangeModelVisible] = React.useState(false);

  const onMenuClick = useCallback(
    async (event: any) => {
      const { key } = event;
      if (key === MenuKeys.Logout) {
        await loginOut();
        flushSync(() => {
          setInitialState((originState) => ({
            ...originState,
            currentUser: {},
          }));
        });
        history.push({
          pathname: LOGIN_PATH,
        });
        return;
      } else if (key === MenuKeys.ChangePassword) {
        setPasswordChangeModelVisible(true);
        return;
      }
    },
    [setInitialState],
  );

  const handleChangePassword = () => {
    setPasswordChangeModelVisible(false);
  };

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          // {
          //   key: 'center',
          //   icon: <UserOutlined />,
          //   label: '个人中心',
          // },
          // {
          //   key: 'settings',
          //   icon: <SettingOutlined />,
          //   label: '个人设置',
          // },
          {
            key: MenuKeys.ChangePassword,
            icon: <KeyOutlined />,
            label: intl.formatMessage({ id: 'pages.label.changePassword' }),
          },
          // {
          //   type: 'divider' as const,
          // },
        ]
      : []),
    {
      key: MenuKeys.Logout,
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
      {passwordChangeModalVisible && (
        <Suspense>
          <ChangePassword onClose={handleChangePassword} />
        </Suspense>
      )}
    </>
  );
};
