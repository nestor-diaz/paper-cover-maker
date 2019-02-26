import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.css';

const Panel = ({ children, title, actionsRenderer }) => (
  <div className={styles.panel}>
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.actions}>{actionsRenderer()}</div>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);

Panel.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  actionsRenderer: PropTypes.func
};

Panel.defaultProps = {
  actionsRenderer: () => {}
};

export default Panel;
