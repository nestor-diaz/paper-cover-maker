import React from 'react';
import PropTypes from 'prop-types';
import styles from './Author.css';

const Author = ({ name, indexes }) => (
  <div className={styles.author}>
    {name}
    <sup>{indexes}</sup>
  </div>
);

Author.propTypes = {
  name: PropTypes.string.isRequired,
  indexes: PropTypes.string.isRequired
};

export default Author;
