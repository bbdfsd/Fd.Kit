import { getRealTextWithPrecision } from '@ant-design/pro-field/es/components/Percent/util';
import { ProFormDigit } from '@ant-design/pro-form';
import type { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit';

const ProFormDigitEx: React.FC<ProFormDigitProps> = (props) => {
  return (
    <ProFormDigit
      proFieldProps={{
        render: (dom, props) => {
          let text = getRealTextWithPrecision(props.value, props.precision || false);
          return text ? `${text} ${props.addonAfter}` : '-';
        },
      }}
      {...props}
    />
  );
};

export default ProFormDigitEx;
