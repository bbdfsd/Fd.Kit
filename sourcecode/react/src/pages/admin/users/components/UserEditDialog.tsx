import { useRequest } from 'ahooks';
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { getIdentityRolesAll } from '@/services/autogenerate/roles';
import {
  getIdentityUsersId,
  postIdentityUsers,
  putIdentityUsersId,
} from '@/services/autogenerate/users';
import { getFormatedRequest, getOrDefault } from '@/services/global';
import { LAYOUT_COL_TWO } from '@/constants/layout';

interface UserEditDialogProps {
  id?: string;
  onClose: (result: boolean) => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const modelRequest = useRequest(
    () =>
      getOrDefault(getIdentityUsersId, id, {
        isActive: true,
        lockoutEnabled: true,
        shouldChangePasswordOnNextLogin: true,
      }),
    {
      refreshDeps: [id],
    },
  );

  useEffect(() => {
    form.setFieldsValue(modelRequest.data);
  }, [modelRequest.data]);

  const isEdit = !!id;
  const titltType = intl.formatMessage({
    id: isEdit ? 'pages.label.update' : 'pages.label.create',
  });
  const title = intl.formatMessage({
    id: 'AbpIdentity::Users',
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
        maskClosable: false,
        loading: modelRequest.loading,
      }}
      form={form}
      width={800}
      title={`${titltType}${title}`}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={async (formData) => {
        await saveForm(formData);
        onClose(true);
      }}
      labelWrap
      labelCol={{ flex: '0 0 100px' }}
      grid
      layout="horizontal"
    >
      <ProFormText
        name="userName"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:UserName' })}
        colProps={LAYOUT_COL_TWO}
        rules={[{ required: true }]}
        disabled={isEdit}
      />
      {/*
      <ProFormText
        name="surname"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:Surname' })}
        rules={[{ required: true }]}
        colProps={LAYOUT_COL_TWO}
      />
      */}
      <ProFormText
        name="name"
        label={`${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Surname' })}${intl.formatMessage({ id: 'AbpIdentity::DisplayName:Name' })}`}
        colProps={LAYOUT_COL_TWO}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="email"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:Email' })}
        colProps={LAYOUT_COL_TWO}
        rules={[{ required: true }, { type: 'email' }]}
      />
      <ProFormText
        name="phoneNumber"
        label={intl.formatMessage({ id: 'AbpAccount::DisplayName:PhoneNumber' })}
        rules={[{ required: true }, { pattern: /^1\d{10}$/, message: '请输入有效的手机号码' }]}
        colProps={LAYOUT_COL_TWO}
      />
      {/* <ProFormSelect
        name="departmentId"
        label={intl.formatMessage({ id: 'field.department' })}
        request={() => getFormatedRequest(getAppDepartmentList, 'id', 'displayName')}
        colProps={LAYOUT_COL_TWO}
      /> */}
      {isEdit ? null : (
        <>
          <ProFormText.Password
            name="password"
            label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:Password' })}
            colProps={LAYOUT_COL_TWO}
            rules={[{ required: !isEdit }, { min: 6 }, { max: 18 }]}
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
        </>
      )}
      <ProFormSelect
        name="roleNames"
        colProps={{ span: 24 }}
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' })}
        request={() => getFormatedRequest(getIdentityRolesAll, 'name', 'name')}
        fieldProps={{
          mode: 'multiple',
        }}
      />
      <ProFormCheckbox
        name="isActive"
        valuePropName="checked"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsActive' })}
        colProps={LAYOUT_COL_TWO}
        // checkedChildren={intl.formatMessage({ id: 'pages.label.actived' })}
        // unCheckedChildren={intl.formatMessage({ id: 'pages.label.unActived' })}
      />
      {/* {!isEdit && (
        <ProFormCheckbox
          name="shouldChangePasswordOnNextLogin"
          valuePropName="checked"
          label="强制修改密码"
          tooltip="用户首次登录时是否强制要求修改密码"
          colProps={LAYOUT_COL_TWO}
        />
      )} */}
    </ModalForm>
  );
};

export default UserEditDialog;
