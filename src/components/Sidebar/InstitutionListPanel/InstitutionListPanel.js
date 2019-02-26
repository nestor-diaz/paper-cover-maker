import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Panel from '~/components/Common/Panel';
import InstitutionList from './InstitutionList';

const InstitutionListPanel = () => (
  <Panel
    title="Institutions" actionsRenderer={() => (
      <Button size="small" onClick={() => {}}>
        <AddIcon />
      </Button>
    )}
  >
    <InstitutionList />
  </Panel>
);

export default InstitutionListPanel;
