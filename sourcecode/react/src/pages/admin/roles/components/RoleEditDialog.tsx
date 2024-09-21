import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {
  getIdentityRolesId,
  postIdentityRoles,
  putIdentityRolesId,
} from '@/services/autogenerate/roles';
import { getFormatedRequest, getOrDefault } from '@/services/global';

interface RoleEditDialogProps {
  id?: string;
  onClose: (result: boolean) => void;
}

const RoleEditDialog: React.FC<RoleEditDialogProps> = ({ id, onClose }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [canRename, setCanRename] = useState(true);

  const isEdit = !!id;
  const titltType = intl.formatMessage({
    id: isEdit ? 'pages.label.update' : 'pages.label.create',
  });
  const title = intl.formatMessage({
    id: 'AbpIdentity::Roles',
  });

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const saveForm = async (formData) => {
    if (id) {
      await putIdentityRolesId({ id }, formData);
    } else {
      await postIdentityRoles(formData);
    }
  };

  return (
    <ModalForm<API.IdentityRoleDto>
      modalProps={{
        maskClosable: false,
      }}
      preserve={true}
      form={form}
      width={480}
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
      request={async () => {
        const result = await getOrDefault(getIdentityRolesId, id);
        setCanRename(result.isStatic);
        return result;
      }}
      layout="horizontal"
    >
      <ProFormText
        name="name"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:RoleName' })}
        rules={[{ required: true }]}
        disabled={canRename}
      />

      <ProFormCheckbox
        name="isDefault"
        valuePropName="checked"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:IsDefault' })}
      />
      {/* <ProFormCheckbox
        name="isPublic"
        valuePropName="checked"
        label={intl.formatMessage({ id: 'AbpIdentity::DisplayName:isPublic' })}
      /> */}
    </ModalForm>
  );
};

export default RoleEditDialog;
