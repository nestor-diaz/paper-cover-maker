import React from 'react';
import PropTypes from 'prop-types';
import styles from './Affiliation.css';

const Affiliation = ({ label }) => (
  <div className={styles.affiliation}>
    <sup>1</sup>
    {label}
  </div>
);

Affiliation.propTypes = {
  label: PropTypes.string.isRequired
};

export default Affiliation;
