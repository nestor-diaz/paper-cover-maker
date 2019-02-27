import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppContext from '~/AppContext';
import Panel from '~/components/Common/Panel';
import InstitutionList from './InstitutionList';

const InstitutionListPanel = () => (
  <AppContext.Consumer>
    {({
      institutions,
      isAddingInstitution,
      onInstitutionStartAdding,
      onInstitutionAdd,
      onInstitutionClick
    }) => (
      <Panel
        title="Institutions" actionsRenderer={() => (
          <Button size="small" onClick={onInstitutionStartAdding}>
            <AddIcon />
          </Button>
        )}
      >
        <InstitutionList
          institutions={institutions}
          onInstitutionAdd={onInstitutionAdd}
          onInstitutionClick={onInstitutionClick}
          showNewInstitutionInput={isAddingInstitution}
        />
      </Panel>
    )}
  </AppContext.Consumer>
);

export default InstitutionListPanel;
