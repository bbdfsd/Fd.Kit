import { MenuDataItem } from '@ant-design/pro-components';
import Permissions from '../src/constants/permissions';

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
const routes: MenuDataItem = [
  {
    path: '/account',
    layout: false,
    routes: [
      {
        path: '/account',
        redirect: 'login',
      },
      {
        path: 'login',
        name: 'login',
        layout: false,
        component: '@/pages/account/login',
      },
      {
        path: 'register',
        layout: false,
        name: 'register',
        component: '@/pages/account/register',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'DashboardOutlined',
    component: '@/pages/dashboard',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'ProductOutlined',
    routes: [
      {
        path: 'organization-units',
        name: 'organizationUnits',
        component: '@/pages/admin/organization-units',
        access: Permissions.AbpIdentity.OrganizationUnits.list,
      },
      {
        path: 'users',
        name: 'users',
        component: '@/pages/admin/users',
        access: Permissions.AbpIdentity.Users.list,
      },
      {
        path: 'roles',
        name: 'roles',
        component: '@/pages/admin/roles',
        access: Permissions.AbpIdentity.Roles.list,
      },
      {
        path: 'settings',
        name: 'settings',
        component: '@/pages/admin/settings',
        access: Permissions.AbpIdentity.Setting.list,
      },
    ],
  },
  {
    path: '/sass',
    name: 'sass',
    icon: 'TeamOutlined',
    routes: [
      {
        path: 'tenants',
        name: 'tenants',
        component: '@/pages/sass/tenants',
        access: Permissions.Sass.AbpTenantManagement.list,
      },
      {
        path: 'editions',
        name: 'editions',
        component: '@/pages/sass/editions',
        access: Permissions.AbpIdentity.FeatureManagement.list,
      },
    ],
  },
  {
    path: 'security-logs',
    name: 'securityLogs',
    icon: 'ReconciliationOutlined',
    component: '@/pages/security-logs',
    access: Permissions.AbpIdentity.IdentitySecurityLogs.list,
  },
  {
    path: 'audit-logs',
    name: 'auditLogs',
    icon: 'ReadOutlined',
    component: '@/pages/audit-logs/layout',
    access: Permissions.AbpIdentity.AuditLog.list,
    menu: {
      hideChildren: true,
    },
    routes: [
      {
        path: '/audit-logs',
        redirect: 'audit',
      },
      {
        path: 'audit',
        component: '@/pages/audit-logs/Audit/index',
      },
      {
        path: 'entity-change',
        component: '@/pages/audit-logs/EntityChange/index',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/*',
    component: '@/pages/exception/404',
  },
];

export default routes;
