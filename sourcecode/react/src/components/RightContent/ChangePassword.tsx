import React from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { createSearchParams, history, useIntl } from '@umijs/max';
import { putBasicManagementAccountChangePassword } from '@/services/autogenerate/account';
import { clearToken } from '@/utils/authority';
import { getCurrentUrlString } from '@/utils/redirect';
import { LOGIN_PATH } from '@/constants/whitelist';

interface IChangePasswordProps {
  onClose: (result: boolean) => void;
  trigger?: JSX.Element;
}

const ChangePassword: React.FC<IChangePasswordProps> = ({ onClose, trigger }) => {
  const intl = useIntl();

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const handleSave = async (values) => {
    await putBasicManagementAccountChangePassword(values);
    message.success(intl.formatMessage({ id: 'AbpAccount::PasswordChangedMessage' }));
    clearToken();
    history.push({
      pathname: LOGIN_PATH,
      search: createSearchParams({
        redirect: getCurrentUrlString(),
      }).toString(),
    });
  };

  return (
    <ModalForm
      modalProps={{
        maskClosable: false,
      }}
      trigger={trigger}
      title={intl.formatMessage({ id: 'AbpAccount::ResetMyPassword' })}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={handleSave}
      labelWrap
      width={450}
      labelCol={{ flex: '0 0 100px' }}
      grid
      layout="horizontal"
    >
      <ProFormText.Password
        name="currentPassword"
        label={intl.formatMessage({ id: 'AbpAccount::DisplayName:Password' })}
        rules={[{ required: true }, { min: 6 }, { max: 18 }]}
      />
      <ProFormText.Password
        name="newPassword"
        dependencies={['currentPassword']}
        label={intl.formatMessage({ id: 'AbpAccount::DisplayName:NewPassword' })}
        rules={[
          { required: true },
          { min: 6 },
          { max: 18 },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('currentPassword') !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(intl.formatMessage({ id: 'pages.label.passwordDuplication' })),
              );
            },
          }),
        ]}
      />
      <ProFormText.Password
        name="repeatNewPassword"
        label={intl.formatMessage({ id: 'AbpAccount::DisplayName:NewPasswordConfirm' })}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(intl.formatMessage({ id: 'validation.twoInputNoEqual' })),
              );
            },
          }),
        ]}
      />
    </ModalForm>
  );
};

export default ChangePassword;
