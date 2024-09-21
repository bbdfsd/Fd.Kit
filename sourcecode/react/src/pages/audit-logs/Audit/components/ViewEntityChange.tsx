import { Collapse } from 'antd';
import EntityChangeTable from '../../components/EntityChangeTable';

interface IViewEntityChangeProps {
  entityChanges: any[];
}

const { Panel } = Collapse;

const ViewEntityChange: React.FC<IViewEntityChangeProps> = ({ entityChanges }) => {
  return (
    <Collapse accordion defaultActiveKey="0">
      {entityChanges.map((item, index) => (
        <Panel header={item.entityTypeFullName} key={`${index}`}>
          <EntityChangeTable propertyChanges={item.propertyChanges} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default ViewEntityChange;
