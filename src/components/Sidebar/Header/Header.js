import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.css';

const Header = ({ title, actionsRenderer }) => (
  <div className={styles.header}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.actions}>
      {actionsRenderer()}
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  actionsRenderer: PropTypes.func
};

Header.defaultProps = {
  actionsRenderer: () => {}
};

export default Header;
