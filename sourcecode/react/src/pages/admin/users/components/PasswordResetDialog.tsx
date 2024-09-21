import { useRequest } from 'ahooks';
import React from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {
  getIdentityUsersId,
  postIdentityUsers,
  putIdentityUsersId,
} from '@/services/autogenerate/users';
import { LAYOUT_COL_TWO } from '@/constants/layout';

interface UserEditDialogProps {
  id?: string;
  onClose: (result: boolean) => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const modelRequest = useRequest(() => getIdentityUsersId({ id }), {
    refreshDeps: [id],
  });

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const saveForm = async (formData) => {
    if (id) {
      await putIdentityUsersId({ id }, { ...modelRequest.data, ...formData });
    } else {
      await postIdentityUsers({
        ...modelRequest.data,
        ...formData,
      });
    }
  };

  return (
    <ModalForm<API.IdentityUserDto>
      modalProps={{
        loading: modelRequest.loading,
      }}
      form={form}
      width={480}
      title={intl.formatMessage({ id: 'pages.label.resetPassword' })}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={async (formData) => {
        await saveForm(formData);
        onClose(true);
      }}
      labelWrap
      // labelCol={{  span: 6 }}
      // grid
      layout="vertical"
    >
      <ProFormText.Password
        name="password"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:Password' })}
        colProps={LAYOUT_COL_TWO}
        rules={[{ required: true }, { min: 6 }, { max: 18 }]}
      />
      <ProFormText.Password
        name="confirmPassword"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:NewPasswordConfirm' })}
        colProps={LAYOUT_COL_TWO}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && getFieldValue('password') !== value) {
                return Promise.reject(
                  new Error(intl.formatMessage({ id: 'pages.tip.confirmPassword' })),
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
    </ModalForm>
  );
};

export default UserEditDialog;
