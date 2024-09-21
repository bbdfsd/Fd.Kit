import type { TreeProps } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRequest } from 'ahooks';
import { Dropdown, Spin, Tree } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { CaretDownOutlined } from '@ant-design/icons';
import { useAccess, useIntl } from '@umijs/max';
import {
  deleteIdentityOrganizationUnitsId,
  getIdentityOrganizationUnitsAll,
} from '@/services/autogenerate/organizationUnits';
import { arrayToTree } from '@/utils';
import Permissions from '@/constants/permissions';
import OrganizationUnitEdit from './OrganizationUnitEdit';

interface OrganizationUnitTreeProps {
  selectedKey?: string;
  onSelect?: (key: string) => void;
  ref?: any;
}

export type OrganizationUnitTreeRef = {
  refresh: () => void;
};

const OrganizationUnitTree: React.FC<OrganizationUnitTreeProps> = forwardRef((props, ref: any) => {
  const intl = useIntl();
  const [opType, setOpType] = useState<'create' | 'update' | undefined>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [menus, setMenus] = useState<ItemType[]>([]);

  const access = useAccess();

  useImperativeHandle<OrganizationUnitTreeRef, any>(ref, () => {
    return {
      refresh: () => {
        treeRequest.refresh();
      },
    };
  });

  useEffect(() => {
    const tmpMenus: ItemType[] = [];
    if (access[Permissions.AbpIdentity.OrganizationUnits.manageOu]) {
      tmpMenus.push({
        key: 'update',
        label: intl.formatMessage({ id: 'BasicManagement::Edit' }),
      });
    }
    if (access[Permissions.AbpIdentity.OrganizationUnits.manageOu]) {
      tmpMenus.push({
        key: 'create',
        label: intl.formatMessage({ id: 'BasicManagement::OrganizationUnit:AddSubUnit' }),
      });
    }
    if (access[Permissions.AbpIdentity.OrganizationUnits.manageOu]) {
      tmpMenus.push({
        key: 'delete',
        label: intl.formatMessage({ id: 'BasicManagement::Delete' }),
      });
    }
    setMenus(tmpMenus);
  }, [access]);

  const treeRequest = useRequest(() => {
    return getIdentityOrganizationUnitsAll().then((result) => {
      const defaultOpenKeys: string[] = [];
      const list = result.map((item) => {
        defaultOpenKeys.push(item.id!);
        return {
          key: item.id!,
          title: item.displayName!,
          parentId: item.parentId!,
        };
      });
      setExpandedKeys(defaultOpenKeys);
      const treeList = arrayToTree(list, {
        keyName: 'key',
        childrenName: 'children',
        parentName: 'parentId',
      });
      return treeList;
    });
  });

  const setDefaultSelectKey = () => {
    props?.onSelect?.('');
  };

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    setExpandedKeys(info.expandedKeys);
  };

  const onDrop: TreeProps['onDrop'] = () => {
    // console.log(info);
    // const dropKey = info.node.key;
    // const dragKey = info.dragNode.key;
    // const dropPos = info.node.pos.split('-');
    // const dropPosition =
    //   info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const loop = (
    //   data: DataNode[],
    //   key: React.Key,
    //   callback: (node: DataNode, i: number, data: DataNode[]) => void
    // ) => {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].key === key) {
    //       return callback(data[i], i, data);
    //     }
    //     if (data[i].children) {
    //       loop(data[i].children!, key, callback);
    //     }
    //   }
    // };
    // const data = [...gData];
    // // Find dragObject
    // let dragObj: DataNode;
    // loop(data, dragKey, (item, index, arr) => {
    //   arr.splice(index, 1);
    //   dragObj = item;
    // });
    // if (!info.dropToGap) {
    //   // Drop on the content
    //   loop(data, dropKey, (item) => {
    //     item.children = item.children || [];
    //     // where to insert 示例添加到头部，可以是随意位置
    //     item.children.unshift(dragObj);
    //   });
    // } else if (
    //   ((info.node as any).props.children || []).length > 0 && // Has children
    //   (info.node as any).props.expanded && // Is expanded
    //   dropPosition === 1 // On the bottom gap
    // ) {
    //   loop(data, dropKey, (item) => {
    //     item.children = item.children || [];
    //     // where to insert 示例添加到头部，可以是随意位置
    //     item.children.unshift(dragObj);
    //     // in previous version, we use item.children.push(dragObj) to insert the
    //     // item to the tail of the children
    //   });
    // } else {
    //   let ar: DataNode[] = [];
    //   let i: number;
    //   loop(data, dropKey, (_item, index, arr) => {
    //     ar = arr;
    //     i = index;
    //   });
    //   if (dropPosition === -1) {
    //     ar.splice(i!, 0, dragObj!);
    //   } else {
    //     ar.splice(i! + 1, 0, dragObj!);
    //   }
    // }
    // setGData(data);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, { node }) => {
    props?.onSelect?.(node.key as string);
  };

  const handleMenuClick = async ({ key }) => {
    switch (key) {
      case 'create':
        setOpType('create');
        break;
      case 'update':
        setOpType('update');
        break;
      case 'delete':
        await deleteIdentityOrganizationUnitsId({
          id: props.selectedKey as string,
        });
        setDefaultSelectKey();
        treeRequest.refresh();
        break;
      default:
        break;
    }
  };

  const handEditCallback = (result) => {
    setOpType(undefined);
    if (result) {
      setExpandedKeys([...expandedKeys, ...selectedValues].filter((m) => !!m));
      treeRequest.refresh();
    }
  };

  const selectedValues = props?.selectedKey ? [props?.selectedKey] : [];

  return (
    <Spin spinning={treeRequest.loading}>
      <Tree
        expandedKeys={expandedKeys}
        autoExpandParent
        defaultExpandAll
        draggable={false}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={treeRequest.data}
        onSelect={onSelect}
        multiple={false}
        onExpand={(keys) => {
          setExpandedKeys(keys);
        }}
        titleRender={(node) => {
          return (
            <div>
              <span style={{ marginRight: 4 }}>{node.title as string}</span>
              {menus.length > 0 && (
                <Dropdown trigger={['click']} menu={{ items: menus, onClick: handleMenuClick }}>
                  <CaretDownOutlined />
                </Dropdown>
              )}
            </div>
          );
        }}
        selectedKeys={selectedValues}
      />
      {opType && (
        <OrganizationUnitEdit
          id={opType === 'update' ? props.selectedKey : undefined}
          parentId={opType === 'create' ? props.selectedKey : undefined}
          onClose={handEditCallback}
        />
      )}
    </Spin>
  );
});

export default OrganizationUnitTree;
