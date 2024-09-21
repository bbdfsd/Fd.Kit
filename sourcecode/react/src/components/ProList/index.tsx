import type { ProListProps } from '@ant-design/pro-list';
import ProList from '@ant-design/pro-list';
import type { ParamsType } from '@ant-design/pro-provider';
import { omit } from 'lodash';

interface CustomProListProp<T = any, U extends ParamsType = any, ValueType = 'text'>
  extends ProListProps<T, U, ValueType> {
  request: (payload: any, option?: BBDFE.TRequestOption) => Promise<any>;
}

function CustomProList<T = any, U extends ParamsType = any, ValueType = 'text'>({
  request,
  ...props
}: CustomProListProp<T, U, ValueType>) {
  return (
    // @ts-ignore
    <ProList<T, ValueType>
      rowKey="id"
      pagination={{
        hideOnSinglePage: true,
        defaultPageSize: 10,
      }}
      {...props}
      request={(params, sorter, filter) => {
        const replatedQuery = omit(params, 'pageSize');
        let sortParam: any = {};
        if (sorter && sorter.order) {
          let sortName: string | null;
          // 对象的情况下 列为数组
          if (Array.isArray(sorter.field)) {
            sortName = sorter.field[sorter.field.length - 1];
          } else {
            sortName = sorter.field;
          }
          sortParam = {
            sorting: `${sortName} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
          };
        }
        const requestParams = {
          ...replatedQuery,
          size: params.pageSize,
          ...sortParam,
          ...filter,
        };
        return request(requestParams).then((result) => {
          return {
            ...result,
            success: true,
            total: result.total,
            data: result.records,
          };
        });
      }}
    />
  );
}

export default CustomProList;
