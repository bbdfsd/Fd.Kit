import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useMemo } from 'react';
import { isEqual } from 'lodash';
import { Checkbox, Tree } from 'antd';
import { createStyles } from 'antd-style';
import { useIntl } from '@umijs/max';
import { treeToKeyValue } from '@/utils';

interface IRoleGroupProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  dataSource: API.PermissionGroupDto[];
}

const useStyles = createStyles(({ token }) => ({
  operator: {
    borderBottom: `1px solid ${token.colorBorder}`,
    padding: `${token.paddingXS}px 0`,
    marginBottom: `${token.marginXS}px`,
  },
}));

const RoleGroup: React.FC<IRoleGroupProps> = ({ value, onChange, dataSource }) => {
  const intl = useIntl();
  const { styles } = useStyles();
  // 数据源组
  const treeMap = useMemo(
    () =>
      treeToKeyValue(dataSource, { key: 'name', label: 'displayName', children: 'permissions' }),
    [dataSource],
  );
  // 全选、半选 按钮状态
  const [checkAll, indeterminate] = useMemo(() => {
    let isCheckAll: boolean = false;
    let isIndeterminate: boolean = false;
    if (treeMap.size > 0) {
      const checkedCount = value?.length || 0;
      if (checkedCount === treeMap.size) {
        isCheckAll = true;
      } else if (checkedCount > 0) {
        isIndeterminate = true;
      }
    }
    return [isCheckAll, isIndeterminate];
  }, [value, treeMap]);

  const hadleChangeCheckAll = (e: CheckboxChangeEvent) => {
    let checkedArr: string[] = [];
    if (e.target.checked) {
      checkedArr = [...treeMap.keys()];
    }
    onChange?.(checkedArr);
  };

  const handleNodeCheckedChange = (checkedKeys) => {
    onChange?.(('checked' in checkedKeys ? checkedKeys.checked : checkedKeys) as string[]);
  };

  return (
    <div>
      <div className={styles.operator}>
        <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={hadleChangeCheckAll}>
          {intl.formatMessage({ id: 'AbpPermissionManagement::SelectAllInThisTab' })}
        </Checkbox>
      </div>
      <Tree
        checkable
        checkStrictly
        defaultExpandAll
        checkedKeys={value}
        fieldNames={{
          title: 'displayName',
          key: 'name',
          children: 'permissions',
        }}
        onCheck={handleNodeCheckedChange}
        treeData={dataSource as any[]}
      />
    </div>
  );
};

// export default RoleGroup

export default React.memo(RoleGroup, isEqual);
