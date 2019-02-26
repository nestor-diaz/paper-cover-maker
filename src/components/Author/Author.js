import React from 'react';
import PropTypes from 'prop-types';
import styles from './Author.css';

const Author = ({ name }) => (
  <div className={styles.author}>
    {name}
    <sup>1,2</sup>
  </div>
);

Author.propTypes = {
  name: PropTypes.string.isRequired
};

export default Author;
