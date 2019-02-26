import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppContext from '~/AppContext';
import Panel from '~/components/Common/Panel';
import TitleTextField from './TitleTextField';
import AuthorList from './AuthorList';
import AffiliationList from './AffiliationList';
import styles from './Sidebar.css';
import Header from './Header';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <TitleTextField />
    <div className={styles.affiliations}>
      <Header title="Affiliations" />
      <AppContext.Consumer>
        {({
          authors,
          isAddingAuthor,
          onAuthorStartAdding,
          onAuthorAdd,
          onInstitutionAddStartAdding,
          onAuthorMove
        }) => (
          <div className={styles.lists}>
            <div className={styles.list}>
              <Panel
                title="Authors" actionsRenderer={() => (
                  <Button size="small" onClick={onAuthorStartAdding}>
                    <AddIcon />
                  </Button>
                )}
              >
                <AuthorList
                  authors={authors}
                  showNewAuthorInput={isAddingAuthor}
                  onAuthorAdd={onAuthorAdd}
                  onAuthorMove={onAuthorMove}
                />
              </Panel>
            </div>
            <div className={styles.list}>
              <Panel
                title="Institutions" actionsRenderer={() => (
                  <Button size="small" onClick={onInstitutionAddStartAdding}>
                    <AddIcon />
                  </Button>
                )}
              >
                <AffiliationList />
              </Panel>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    </div>
  </div>
);

export default Sidebar;
