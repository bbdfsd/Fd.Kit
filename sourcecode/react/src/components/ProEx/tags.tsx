import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { Tag } from 'antd';

const Tags: ProRenderFieldPropsType = {
  render: (v) => {
    return (
      <>
        {v.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </>
    );
  },
  // renderFormItem: (text, props) => <TagList {...props} {...props?.fieldProps} />,
};

export default Tags;
