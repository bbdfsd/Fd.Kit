import type { ParamsType, ProTableProps } from '@ant-design/pro-components';
import React from 'react';
import { omit } from 'lodash';
import { ProTable, proTheme } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const { useToken: useProToken } = proTheme;

export type FdProTableProps<
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = 'text',
> = {
  request: (payload) => Promise<any>;
} & ProTableProps<T, U, ValueType>;

const FdProTable = <
  T extends Record<string, any>,
  U extends ParamsType = ParamsType,
  ValueType = 'text',
>({
  request,
  ...props
}: FdProTableProps<T, U, ValueType>) => {
  const { token: proToken } = useProToken();
  const intl = useIntl();

  const rest: Record<string, any> = {
    toolBarRender: false,
  };
  // 默认不展示 boolbar 块，当有标题的时候需要展示(否则标题不能正常显示)
  if (props.headerTitle) {
    rest.toolBarRender = undefined;
  }
  return (
    <ProTable<T, U, ValueType>
      rowKey={'id' as any}
      options={false}
      {...rest}
      scroll={{
        scrollToFirstRowOnChange: true,
        // x: 1200,
        x: 'max-content',
        ...props.scroll,
      }}
      sticky={{
        offsetHeader: proToken.Layout?.headerHeight as number,
      }}
      revalidateOnFocus={false}
      {...props}
      pagination={{
        defaultPageSize: 10,
        pageSize: 10,
        // showSizeChanger: true,
        hideOnSinglePage: true,
        // showQuickJumper:true,
        // pageSizeOptions:["10","15","20","25","30","50","100"],
        showTotal: (total, [start, end]) =>
          intl.formatMessage({ id: 'component.table.pagination' }, { start, end, total }),
        ...props.pagination,
      }}
      search={
        props.search === false
          ? false
          : {
              // collapseRender: false,
              defaultCollapsed: false,
              ...props.search,
            }
      }
      request={(params, sorter, filter) => {
        const replatedQuery = omit(params, 'pageSize', 'current');
        let sortParam: any = {};
        const sorters = Object.keys(sorter);
        if (sorters.length > 0) {
          // let sortName: string | null;
          // // 对象的情况下 列为数组
          // if (Array.isArray(sorter.field)) {
          //   sortName = sorter.field[sorter.field.length - 1];
          // } else {
          //   sortName = sorter.field;
          // }
          const firstSorterKey = sorters[0];

          sortParam = {
            sorting: `${firstSorterKey} ${sorter[firstSorterKey] === 'ascend' ? 'asc' : 'desc'}`,
          };
        }
        const requestParams = {
          ...replatedQuery,
          skipCount: ((params.current || 1) - 1) * (params.pageSize || 10),
          maxResultCount: params.pageSize,
          ...sortParam,
          ...filter,
        };
        return request(requestParams).then((result) => {
          return {
            ...result,
            success: true,
            total: result.totalCount,
            data: result.items,
          };
        });
      }}
    />
  );
};

export default FdProTable;
