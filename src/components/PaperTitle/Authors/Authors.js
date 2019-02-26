import React from 'react';
import PropTypes from 'prop-types';
import Author from '~/components/Author';
import styles from './Authors.css';

const Authors = ({ authors }) => (
  <div className={styles.authors}>
    {authors.map((author, index) => <Author key={`author-${index}`} name={author.name} />)}
  </div>
);

Authors.propTypes = {
  authors: PropTypes.array
};

Authors.defaultProps = {
  authors: []
};

export default Authors;
