import React from 'react';
import { PageContainer, PageContainerProps } from '@ant-design/pro-components';

export type FDPageContainerProps = {
  children: React.ReactNode;
} & PageContainerProps;

/**
 * 基于 PageContainer 的封装，用于统一页面布局
 */
const FDPageContainer: React.FC<FDPageContainerProps> = ({ children, ...restProps }) => {
  return (
    <PageContainer
      ghost
      header={{
        title: false,
        breadcrumb: {},
      }}
      {...restProps}
    >
      {children}
    </PageContainer>
  );
};

export default FDPageContainer;
