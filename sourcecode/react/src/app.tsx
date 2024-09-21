import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { SettingDrawer, ProProvider } from '@ant-design/pro-components';
import { createSearchParams, history, getLocale } from '@umijs/max';
import { localeInfo } from '@/utils/localesEx';
import { getCurrentUrlString } from '@/utils/redirect';
import Footer from '@/components/Footer';
import { percentEx, tags } from '@/components/ProEx';
import { SelectLang } from '@/components/RightContent';
import { AvatarName, AvatarDropdown } from '@/components/RightContent/AvatarDropdown';
import Page403 from '@/pages/exception/403';
import defaultSettings from '../config/defaultSettings';
import { LOGIN_PATH, WHITELIST } from './constants/whitelist';
import requestConfig from './request-config';
import { getCurrentUser } from './services/global';

const isDev = process.env.NODE_ENV === 'development';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: FD.TUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<FD.TUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const result = await getCurrentUser();
    return result.currentUser as FD.TUser;
  };
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: (location) => {
      // 未登录状态下，非白名单页面跳转到登录页面
      if (!initialState?.currentUser?.id && !WHITELIST.includes(location?.pathname ?? '')) {
        history.push({
          pathname: LOGIN_PATH,
          search: createSearchParams({
            redirect: getCurrentUrlString(),
          }).toString(),
        });
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <Page403 />,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  ...requestConfig,
};

// 解决umi下 rootContainer导致菜单权限失效的bug
const SystemWraper = ({ children, routes }) => {
  const proProviderValues = useContext(ProProvider);
  const locale = getLocale();
  const localMessages = localeInfo[locale];
  return (
    <ProProvider.Provider
      value={{
        ...proProviderValues,
        valueTypeMap: {
          percentEx,
          tags,
        },
      }}
    >
      <ConfigProvider
        theme={{
          cssVar: true,
          hashed: false,
        }}
        form={{
          validateMessages: localMessages?.validationMessages,
        }}
        input={{
          autoComplete: 'off',
        }}
      >
        {React.cloneElement(children, {
          ...children.props,
          routes,
        })}
      </ConfigProvider>
    </ProProvider.Provider>
  );
};

export function rootContainer(container) {
  return React.createElement(SystemWraper, null, container);
}
