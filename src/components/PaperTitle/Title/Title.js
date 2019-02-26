import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.css';

const Title = ({ title }) => {
  const finalTitle = title !== ''
    ? title
    : <span className={styles.tempText}>Paper Title</span>;

  return (<div className={styles.title}>{finalTitle}</div>);
};

Title.propTypes = {
  title: PropTypes.string
};

Title.defaultProps = {
  title: 'Paper Title'
};

export default Title;
