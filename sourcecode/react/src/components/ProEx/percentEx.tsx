import { ProRenderFieldPropsType } from '@ant-design/pro-provider';

const PercentEx: ProRenderFieldPropsType = {
  render: (v) => {
    const percent100 = Number(v) * 100;
    return <>{percent100 ? `${percent100.toFixed(0)}%` : '-'}</>;
  },
};

export default PercentEx;
