import type { IconBaseProps } from '@ant-design/icons/es/components/Icon';
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import defaultSettings from '../../../config/defaultSettings';

interface IconFontProps extends IconBaseProps {
  type: string;
}

let IconFont: React.FunctionComponent<IconFontProps>;

export default (props: IconFontProps) => {
  if (!IconFont) {
    IconFont = createFromIconfontCN({
      scriptUrl: defaultSettings.iconfontUrl,
    });
  }
  return IconFont ? <IconFont {...props} /> : null;
};
