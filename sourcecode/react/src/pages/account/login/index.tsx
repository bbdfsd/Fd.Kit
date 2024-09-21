import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { createStyles } from 'antd-style';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import {
  FormattedMessage,
  Helmet,
  SelectLang,
  useIntl,
  useModel,
  useSearchParams,
  useNavigate,
} from '@umijs/max';
import { postLogin } from '@/services/global';
import { setToken } from '@/utils/authority';
import { getSafeRedirectUrl } from '@/utils/redirect';
import Footer from '@/components/Footer';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { styles } = useStyles();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loginError, setLoginError] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const safeRedirect = getSafeRedirectUrl(searchParams.get('redirect'));

  useEffect(() => {
    if (initialState?.currentUser?.id) {
      navigate(safeRedirect);
    }
  }, []);

  const handleSubmit = async (values: API.LoginInput) => {
    try {
      // 登录
      const result = await postLogin(values, {
        skipErrorHandler: true,
      });
      setToken({
        token: result.token as string,
        tokenType: 'Bearer',
      });
      const currentUser = await initialState?.fetchUserInfo();
      setInitialState((originState) => {
        return {
          ...originState,
          currentUser,
        };
      });
      navigate(safeRedirect);
      return;
    } catch (error: any) {
      const responseError = error?.response?.data?.error || error?.response?.data?.code;
      const defaultLoginFailureMessage =
        responseError.message ||
        responseError.codeintl.formatMessage({
          id: 'pages.login.error.usernameOrPassword',
        });
      setLoginError(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.account.login',
          })}
          - {initialState?.settings?.title ?? ''}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={`${window['publicPath']}logo.svg`} />}
          title={initialState?.settings?.title}
          subTitle={intl.formatMessage({
            id: 'pages.layouts.userLayout.title',
          })}
          onFinish={handleSubmit}
        >
          {loginError && (
            <Alert
              style={{
                marginBottom: 24,
              }}
              message={loginError}
              type="error"
              showIcon
            />
          )}
          <>
            <ProFormText
              name="userNameOrEmailAddress"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.field.userNameOrEmailAddress',
              })}
              required
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.field.password',
              })}
              required
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="rememberMe">
              <FormattedMessage id="pages.login.rememberMe" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
