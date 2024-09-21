import React, { useState } from 'react';
import { useResponsive } from 'ahooks';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {
  getIdentityOrganizationUnitsId,
  postIdentityOrganizationUnits,
  putIdentityOrganizationUnitsId,
} from '@/services/autogenerate/organizationUnits';
import { getOrDefault } from '@/services/global';

interface IOrganizationEditProps {
  id?: string;
  parentId?: string;
  onClose: (result: boolean) => void;
}

const OrganizationEdit: React.FC<IOrganizationEditProps> = ({ id, parentId, onClose }) => {
  const [parentOrganizationUnit, setParentOrganizationUnit] = useState<API.OrganizationUnitDto>();
  const intl = useIntl();

  const handleChangeVisible = (visible) => {
    if (!visible) {
      onClose(false);
    }
  };

  const handleSave = async (values) => {
    if (id) {
      await putIdentityOrganizationUnitsId({ id }, values);
    } else {
      await postIdentityOrganizationUnits({
        ...values,
        parentId: parentOrganizationUnit?.id || undefined,
      });
    }
    onClose(true);
  };

  const isEdit = !!id;
  const titltType = intl.formatMessage({
    id: isEdit ? 'pages.label.update' : 'pages.label.create',
  });

  const title = intl.formatMessage({
    id: 'BasicManagement::OrganizationUnits',
  });

  return (
    <ModalForm
      modalProps={{
        maskClosable: false,
      }}
      width={450}
      title={`${titltType}${title}`}
      onOpenChange={handleChangeVisible}
      open={true}
      onFinish={handleSave}
      request={async () => {
        const model = await getOrDefault(getIdentityOrganizationUnitsId, id || parentId);
        if (parentId) {
          setParentOrganizationUnit(model);
          return {};
        }
        return model;
      }}
      labelWrap
      labelCol={{ flex: '0 0 60px' }}
      grid
      layout="horizontal"
    >
      {parentOrganizationUnit && (
        <ProFormText
          readonly={true}
          fieldProps={{
            value: parentOrganizationUnit.displayName,
          }}
          label={intl.formatMessage(
            { id: 'BasicManagement::OrganizationUnit:Parent{0}' },
            { 0: '' },
          )}
        />
      )}

      <ProFormText
        name="displayName"
        label={intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:DisplayName:Name' })}
        rules={[{ required: true }, { max: 64 }]}
      />
    </ModalForm>
  );
};

export default OrganizationEdit;
