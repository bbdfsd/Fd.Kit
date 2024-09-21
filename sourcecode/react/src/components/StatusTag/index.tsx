import React from 'react';
import { Tag } from 'antd';
import { useIntl } from '@umijs/max';

interface IStatusTagProps {
  /**
   * 状态值
   */
  status?: boolean;
  // 为 true 时的文字
  trueLabel?: string;
  /**
   * 为 false 时的文字
   */
  falseLabel?: string;
}

const StatusTag: React.FC<IStatusTagProps> = ({ status, trueLabel, falseLabel }) => {
  const intl = useIntl();
  let trueText = trueLabel || intl.formatMessage({ id: 'pages.label.enable' });
  let falseText = falseLabel || intl.formatMessage({ id: 'pages.label.disable' });

  if (status) {
    return <Tag color="#108ee9">{trueText}</Tag>;
  }
  return <Tag>{falseText}</Tag>;
};

export default StatusTag;
