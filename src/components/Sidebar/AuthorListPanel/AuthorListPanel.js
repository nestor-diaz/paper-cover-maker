import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppContext from '~/AppContext';
import Panel from '~/components/Common/Panel';
import AuthorList from './AuthorList';

const AuthorListPanel = () => (
  <AppContext.Consumer>
    {({
      authors,
      authorSelected,
      isAddingAuthor,
      onAuthorStartAdding,
      onAuthorAdd,
      onAuthorDelete,
      onAuthorClick,
      onAuthorMove
    }) => (
      <Panel
        title="Authors" actionsRenderer={() => (
          <Button size="small" onClick={onAuthorStartAdding}>
            <AddIcon />
          </Button>
        )}
      >
        <AuthorList
          authors={authors}
          authorSelected={authorSelected}
          showNewAuthorInput={isAddingAuthor}
          onAuthorAdd={onAuthorAdd}
          onAuthorDelete={onAuthorDelete}
          onAuthorClick={onAuthorClick}
          onAuthorMove={onAuthorMove}
        />
      </Panel>
    )}
  </AppContext.Consumer>
);

export default AuthorListPanel;
