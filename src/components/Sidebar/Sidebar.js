import React from 'react';
import PropTypes from 'prop-types';
import AuthorListPanel from './AuthorListPanel';
import InstitutionListPanel from './InstitutionListPanel';
import TitleTextField from './TitleTextField';
import styles from './Sidebar.css';
import Header from './Header';
import Footer from './Footer';

const Sidebar = ({ onSave }) => (
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
    <Footer onSave={onSave} />
  </div>
);

Sidebar.propTypes = {
  onSave: PropTypes.func
};

Sidebar.defaultProps = {
  onSave: () => {}
};

export default Sidebar;
