import React from 'react';
import PropTypes from 'prop-types';
import Author from '~/components/Author';
import styles from './Authors.css';

const Authors = ({ authors, authorsIndexes }) => (
  <div className={styles.authors}>
    {authors.map((author, index) => {
      const { id, name } = author;
      const authorIndex = authorsIndexes.find((currentIndex) => currentIndex.author.id === id);
      const indexes = authorIndex ? authorIndex.indexes.sort().join(',') : '';

      return <Author key={`author-${index}`} name={name} indexes={indexes} />;
    })}
  </div>
);

Authors.propTypes = {
  authors: PropTypes.array,
  authorsIndexes: PropTypes.array
};

Authors.defaultProps = {
  authors: [],
  authorsIndexes: []
};

export default Authors;
