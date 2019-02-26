import React from 'react';
import AuthorListPanel from './AuthorListPanel';
import InstitutionListPanel from './InstitutionListPanel';
import TitleTextField from './TitleTextField';
import styles from './Sidebar.css';
import Header from './Header';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <TitleTextField />
    <div className={styles.affiliations}>
      <Header title="Affiliations" />
      <div className={styles.lists}>
        <div className={styles.list}>
          <AuthorListPanel />
        </div>
        <div className={styles.list}>
          <InstitutionListPanel />
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
