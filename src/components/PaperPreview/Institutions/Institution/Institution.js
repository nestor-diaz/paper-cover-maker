import React from 'react';
import PropTypes from 'prop-types';
import styles from './Institution.css';

const Institutions = ({ label, index }) => (
  <div className={styles.institution}>
    {index !== 0 && <sup>{index}</sup>}
    {label}
  </div>
);

Institutions.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default Institutions;
