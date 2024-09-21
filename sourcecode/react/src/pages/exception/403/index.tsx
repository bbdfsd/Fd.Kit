import { Button, Result } from 'antd';
import { Link } from '@umijs/max';

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this pages."
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
);
